interface ICookieInfo {
  userId: number;
  nickname: string;
  avatar: string;
}

/**
 * 设置 cookie
 * */
export const setCookie = (
  cookie: any,
  { userId, nickname, avatar }: ICookieInfo
) => {
  const path = '/';
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  cookie.set('userId', userId, {
    path,
    expires,
  });
  cookie.set('nickname', nickname, {
    path,
    expires,
  });
  cookie.set('avatar', avatar, {
    path,
    expires,
  });
};

/**
 * 清除 cookie
 * */
export const clearCookie = (cookie: any) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const path = '/';

  cookie.set('userId', '', {
    path,
    expires,
  });
  cookie.set('nickname', '', {
    path,
    expires,
  });
  cookie.set('avatar', '', {
    path,
    expires,
  });
};
