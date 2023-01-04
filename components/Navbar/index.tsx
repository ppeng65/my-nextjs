import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from 'antd';
import Login from 'components/Login';
import { navs } from './config';
import styles from './index.module.scss';

const Navbar: NextPage = () => {
  const { pathname } = useRouter();

  const [isShowLogin, setIsShowLogin] = useState(false);
  /**
   * 写文章
   * */
  const onEditorPage = () => {};

  /**
   * 登录
   * */
  const onLogin = () => {
    setIsShowLogin(true);
  };

  /**
   * 关闭登录弹窗
   * */
  const onClose = () => {
    setIsShowLogin(false);
  };

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>LOGO</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => {
          return (
            <Link
              className={pathname === nav.value ? styles.active : ''}
              key={nav?.label}
              href={nav?.value}
            >
              {nav?.label}
            </Link>
          );
        })}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={onEditorPage}>写文章</Button>
        <Button type="primary" onClick={onLogin}>
          登录
        </Button>
      </section>
      <Login isShow={isShowLogin} onClose={onClose} />
    </div>
  );
};

export default Navbar;
