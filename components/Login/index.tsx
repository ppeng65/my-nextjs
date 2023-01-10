import type { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';
import { useStore } from 'store/index';
import CountDown from '../CountDown';
import styles from './index.module.scss';
import request from 'service/request';

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login: NextPage<IProps> = ({ isShow, onClose }) => {
  const store = useStore();
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
    if (!form.phone) {
      message.error('请输入手机号');
      return;
    }

    request({
      url: '/api/user/sendVerifyCode',
      method: 'POST',
      data: {
        phone: form.phone,
      },
    }).then((res: any) => {
      if (res.code === 0) {
        setIsShowVerifyCode(true);
      } else {
        message.error(res?.msg || '未知错误');
      }
    });
  };

  /**
   * 登录
   * */
  const onLogin = () => {
    request
      .post('/api/user/login', {
        ...form,
        identity_type: 'phone',
      })
      .then((res: any) => {
        if (res.code === 0) {
          store.user.setUserInfo(res?.data);

          setForm({
            phone: '',
            verify: '',
          });
          onClose();
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Github 登录
   * */
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

export default observer(Login);
