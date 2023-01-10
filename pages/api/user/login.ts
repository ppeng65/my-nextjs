import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { setCookie } from 'cookies-next';
import { ironOptions } from 'config/index';
import { ISession } from '../index';
import { prepareConnection } from 'db/index';
import { User, UserAuth } from 'db/entity/index';
import { setCookies } from 'utils/index';

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: ISession = req.session;
  const { phone, verify, identity_type } = req.body;
  const db = await prepareConnection();
  // const userRepo = db.getRepository(User);
  // const users = await userRepo.find();
  const userAuthRepo = db.getRepository(UserAuth);

  if (String(session.verifyCode) === String(verify)) {
    const userAuths = await userAuthRepo.findOne(
      {
        identity_type,
        identifier: phone,
      },
      {
        relations: ['user'],
      }
    );

    if (userAuths) {
      const { id: userId, nickname, avatar } = userAuths.user;
      session.userId = userId;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();

      // setCookie('userId', id, cookieOptions);
      // setCookie('nickname', nickname, cookieOptions);
      // setCookie('avatar', avatar, cookieOptions);
      setCookies(setCookie, { userId, nickname, avatar }, { req, res });

      res.status(200).json({
        code: 0,
        msg: '登录成功',
        data: { userId: userId, nickname, avatar },
      });
    } else {
      // 新用户
      const user = new User();
      user.nickname = `用户_${String(phone).substring(7)}`;
      user.avatar = '/images/avatar.jpg';
      user.job = '暂无';
      user.introduce = '暂无';

      const userAuth = new UserAuth();
      userAuth.identifier = phone;
      userAuth.identity_type = identity_type;
      userAuth.credential = session.verifyCode;
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

      res.status(200).json({
        code: 0,
        msg: '登录成功',
        data: { userId: userId, nickname, avatar },
      });
    }
  } else {
    res.status(200).json({
      code: -1,
      msg: '验证码错误',
      data: null,
    });
  }
};

export default withIronSessionApiRoute(Login, ironOptions);
