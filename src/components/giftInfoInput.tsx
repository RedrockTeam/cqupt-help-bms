import React, { useState, useEffect } from 'react';
import { Input, Select, Tag } from 'antd';
import styles from './giftInfoInput.css';
import sharedStyles from '@/assets/styles.css';
import { PushGiftInputResult } from '@/interfaces/activity';

type Props = {
  onChangeGiftInputLevel: (level: number) => void;
  onChangeGiftInputName: (name: string) => void;
  onChangeGiftInputStuNum: (stuNum: string) => void;
  pushGiftInput: any;
};

const Member = ({
  onChangeGiftInputLevel,
  onChangeGiftInputName,
  onChangeGiftInputStuNum,
  pushGiftInput,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.border}>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>奖品等级</span>
          <Input
            value={pushGiftInput.level}
            className={sharedStyles.inputBorder}
            onChange={e => onChangeGiftInputLevel(parseInt(e.target.value, 10))}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>奖品名称</span>
          <Input
            value={pushGiftInput.name}
            className={sharedStyles.inputBorder}
            maxLength={10}
            placeholder="10 个字以内"
            onChange={e => onChangeGiftInputName(e.target.value)}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>领奖用户</span>
          <Select
            value={pushGiftInput.stu_nums.map(s => s.stu_num)}
            mode="tags"
            className={styles.stuNum}
            placeholder="输入学号"
            onChange={stuNum => onChangeGiftInputStuNum(`${stuNum}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Member;
