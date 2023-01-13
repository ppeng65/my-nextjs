/*
 * @Author: zhangpeng
 * @Date: 2023-01-13 09:21:05
 * @LastEditors: zhangpeng
 * @LastEditTime: 2023-01-13 11:02:23
 * @Description:
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { setCookie } from 'cookies-next';
import { ironOptions } from 'config/index';
import request from 'service/request';
import { prepareConnection } from 'db/index';
import { User, UserAuth } from 'db/entity/index';
import { ISession } from '../index';
import { setCookies } from 'utils/index';

const GithubOauth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: ISession = req.session;
  const { code } = req.query;

  const clientId = 'c5587485ad219ea475c8';
  const clientSecret = '98c50a0f4dc4de1dee9dab0b6a7e992f72399cd3';

  const getAccessTokenUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
  const accessTokenRes = await request.post(
    getAccessTokenUrl,
    {},
    {
      headers: {
        accept: 'application/json',
      },
    }
  );
  const { access_token } = accessTokenRes as any;
  const getGithubUser: any = await request.get('https://api.github.com/user', {
    headers: {
      accept: 'application/json',
      Authorization: `token ${access_token}`,
    },
  });

  const { login, avatar_url } = getGithubUser;

  const db = await prepareConnection();
  const userAuthRepo = db.getRepository(UserAuth);
  const userAuths = await userAuthRepo.findOne(
    {
      identity_type: 'github',
      identifier: login,
    },
    {
      relations: ['user'],
    }
  );

  if (userAuths) {
    userAuths.credential = access_token;
    const resUserAuth = await userAuthRepo.save(userAuths);
    const {
      user: { id: userId, nickname, avatar },
    } = resUserAuth;

    session.userId = userId;
    session.nickname = nickname;
    session.avatar = avatar;
    await session.save();

    setCookies(setCookie, { userId, nickname, avatar }, { req, res });
    res.status(200).redirect('/');
  } else {
    const user = new User();
    user.nickname = login;
    user.avatar = avatar_url;
    user.job = '暂无';
    user.introduce = '暂无';

    const userAuth = new UserAuth();
    userAuth.identifier = login;
    userAuth.identity_type = 'github';
    userAuth.credential = access_token;
    userAuth.user = user;

    const resUserAuth = await userAuthRepo.save(userAuth);
    const {
      user: { id: userId, nickname, avatar },
    } = resUserAuth;
    session.userId = userId;
    session.nickname = nickname;
    session.avatar = avatar;
    await session.save();

    setCookies(setCookie, { userId, nickname, avatar }, { req, res });

    res.status(200).redirect('/');
  }
};

export default withIronSessionApiRoute(GithubOauth, ironOptions);
