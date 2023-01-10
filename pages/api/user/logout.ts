import type { NextApiRequest, NextApiResponse } from 'next';
// import { Cookie } from 'next-cookie';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from '../index';
// import { clearCookie } from 'utils/index';

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: ISession = req.session;
  // const cookie = Cookie.fromApiRoute(req, res);

  await session.destroy();
  // console.log('cookie', Cookie);

  // clearCookie(cookie);

  res.status(200).json({
    code: 0,
    msg: '退出登录成功',
    data: {},
  });
};

export default withIronSessionApiRoute(Logout, ironOptions);
