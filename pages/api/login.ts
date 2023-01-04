import type { NextApiRequest, NextApiResponse } from 'next';

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(typeof req.body);

  res.status(200).send({
    code: 0,
    msg: '登录成功',
    data: {},
  });
};

export default Login;
