import type { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import CountDown from '../CountDown';
import styles from './index.module.scss';

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login: NextPage<IProps> = ({ isShow, onClose }) => {
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);

  /**
   * 倒计时结束
   * */
  const onCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };

  /**
   * input change
   * */
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  /**
   * 获取验证码
   * */
  const onGetVerifyCode = () => {
    setIsShowVerifyCode(true);
  };

  /**
   * 登录
   * */
  const onLogin = () => {};

  const onOAuthGit = () => {};

  /**
   * 关闭弹窗
   * */
  const onClickClose = () => {
    onClose();
  };

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>手机号登录</div>
          <div className={styles.close} onClick={onClickClose}>
            x
          </div>
        </div>
        <input
          type="text"
          name="phone"
          value={form.phone}
          placeholder="请输入手机号"
          onChange={onChangeInput}
        />
        <div className={styles.verifyCodeArea}>
          <input
            type="text"
            name="verify"
            value={form.verify}
            placeholder="请输入验证码"
            onChange={onChangeInput}
          />
          <span className={styles.verifyCode} onClick={onGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={onCountDownEnd} />
            ) : (
              '获取验证码'
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={onLogin}>
          登录
        </div>
        <div className={styles.otherLogin} onClick={onOAuthGit}>
          使用 Github 登录
        </div>
        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a href="" target="_blank">
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
