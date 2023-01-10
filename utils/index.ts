import type { NextApiRequest, NextApiResponse } from 'next';

interface ICookieInfo {
  userId: number;
  nickname: string;
  avatar: string;
}

/**
 * 设置 cookie
 * */
export const setCookies = (
  setCookie: any,
  { userId, nickname, avatar }: ICookieInfo,
  { req, res }: { req: NextApiRequest, res: NextApiResponse }
) => {
  const path = '/';
  const maxAge = 24 * 60 * 60;
  const options = { req, res, path, maxAge };

  setCookie('userId', userId, options);
  setCookie('nickname', nickname, options);
  setCookie('avatar', avatar, options);
};

/**
 * 清除 cookie
 * */
export const clearCookies = (
  delCookies: any,
  { req, res }: { req: NextApiRequest, res: NextApiResponse }
) => {
  const path = '/';
  const maxAge = 24 * 60 * 60;
  const options = { req, res, path, maxAge };

  delCookies('userId', options);
  delCookies('nickname', options);
  delCookies('avatar', options);
};
