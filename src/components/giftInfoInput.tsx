import React, { useState, useEffect } from 'react';
import { Input, Select } from 'antd';
import styles from './giftInfoInput.css';
import sharedStyles from '@/assets/styles.css';
import { PushGiftInputResult } from '@/interfaces/activity';

type Props = {
  onChangeGiftInputLevel: (level: number) => void;
  onChangeGiftInputName: (name: string) => void;
  onChangeGiftInputStuNum: (stuNum: string) => void;
};

const Member = ({
  onChangeGiftInputLevel,
  onChangeGiftInputName,
  onChangeGiftInputStuNum,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.border}>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>奖品等级</span>
          <Input
            className={sharedStyles.inputBorder}
            onChange={e => onChangeGiftInputLevel(parseInt(e.target.value, 10))}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>奖品名称</span>
          <Input
            className={sharedStyles.inputBorder}
            maxLength={10}
            placeholder="10 个字以内"
            onChange={e => onChangeGiftInputName(e.target.value)}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>领奖用户</span>
          <Select
            mode="tags"
            className={styles.stuNum}
            placeholder="输入学号"
            onSelect={stuNum => onChangeGiftInputStuNum(`${stuNum}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Member;
