import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from '../index';
import { clearCookies } from 'utils/index';

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: ISession = req.session;

  await session.destroy();
  const options = { req, res };
  // deleteCookie('userId', options);
  // deleteCookie('nickname', options);
  // deleteCookie('avatar', options);
  clearCookies(deleteCookie, options);

  res.status(200).json({
    code: 0,
    msg: '退出登录成功',
    data: {},
  });
};

export default withIronSessionApiRoute(Logout, ironOptions);
