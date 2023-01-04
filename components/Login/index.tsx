import type { NextPage } from 'next';
import styles from './index.module.scss';

interface IProps {
  isShow: boolean;
  onClose?: Function;
}

const Login: NextPage<IProps> = ({ isShow }) => {
  // const onClickClose = () => {
  //   onClose();
  // };

  return isShow ? (
    <div className={styles.loginBox}>
      <div className={styles.loginArea}>
        <div className={styles.title}></div>
      </div>
    </div>
  ) : null;
};

export default Login;
