import React, { useState } from 'react';
import { useLocation } from 'umi';
import { message } from 'antd';
import styles from './index.css';
import passwordIcon from '@/assets/password-icon.png';
import passwordTitleIcon from '@/assets/password-title-icon.png';
import accountIcon from '@/assets/account-icon.png';
import { redirectTo } from '@/utils';

const Bind = () => {
  const { query } = useLocation();
  console.log(location);
  const [account, setAccount] = useState('');
  const handleAccountInput = e => setAccount(e.target.value);

  const [password, setPassword] = useState('');
  const handlePasswordInput = e => setPassword(e.target.value);

  const [disabled, setDisabled] = useState(false);

  const handleBind = async () => {
    setDisabled(true);
    fetch('https://wx.redrock.team/magicloop/bind', {
      method: 'POST',
      body: JSON.stringify({
        openid: query.openid,
        stuNum: account,
        idNum: password,
        bindType: query.bindType,
        code: query.code,
        state: query.state,
      }),
    })
      .then(res => res.json())
      .then(({ token }) => {
        localStorage.setItem('cqupt-help-bms-token', token);
        redirectTo('/');
      })
      .then(() => setDisabled(false));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>首次登录绑定</div>
      <div className={styles.form}>
        <div className={styles.formItem}>
          <div className={styles.formTitle}>
            {/* <img src={accountIcon} className={styles.titleIcon} /> */}
            账号
          </div>
          <div className={styles.itemWrapper}>
            <input
              className={styles.input}
              type="span"
              maxLength={10}
              value={account}
              onInput={handleAccountInput}
              placeholder="学号"
            />
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.formTitle}>
            {/* <img src={passwordTitleIcon} className={styles.titleIcon} /> */}
            密码
          </div>
          <div className={styles.itemWrapper}>
            <input
              className={styles.input}
              type="password"
              maxLength={6}
              value={password}
              onInput={handlePasswordInput}
              placeholder="身份证后六位"
            />
          </div>
        </div>
        <button
          className={`${styles.btn} ${disabled ? styles.disabled : ''}`}
          onClick={handleBind}
          disabled={disabled}
        >
          {disabled ? 'Loading...' : '登录'}
        </button>
      </div>
      <span className={styles.copyright}>COPYRICHT@红岩网校工作站</span>
    </div>
  );
};

export default Bind;
