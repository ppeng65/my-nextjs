import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, Dropdown, message, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import Login from 'components/Login';
import { useStore } from 'store/index';
import { navs } from './config';
import request from 'service/request';
import styles from './index.module.scss';

const Navbar: NextPage = () => {
  const store = useStore();
  const { pathname } = useRouter();

  const [isShowLogin, setIsShowLogin] = useState(false);

  const onMenuSelect: MenuProps['onClick'] = (e) => {
    console.log(e);
    if (e.key === 'person') {
      // 个人中心
    } else if (e.key === 'logout') {
      // 退出登录
      request.post('/api/user/logout').then((res: any) => {
        if (res.code === 0) {
          store.user.setUserInfo({});
          message.success('退出成功');
        }
      });
    }
  };

  const menuProps = {
    items: [
      {
        label: '个人中心',
        key: 'person',
        icon: <HomeOutlined />,
      },
      {
        label: '退出登录',
        key: 'logout',
        icon: <LogoutOutlined />,
      },
    ],
    onClick: onMenuSelect,
  };
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
        {store.user.userInfo?.userId ? (
          <Dropdown menu={menuProps}>
            <Space>
              <Avatar src={store.user.userInfo.avatar} size={26} />
              {store.user.userInfo.nickname}
              <DownOutlined />
            </Space>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={onLogin}>
            登录
          </Button>
        )}
      </section>
      <Login isShow={isShowLogin} onClose={onClose} />
    </div>
  );
};

export default observer(Navbar);
