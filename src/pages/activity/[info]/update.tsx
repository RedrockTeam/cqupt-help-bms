import React, { useState } from 'react';
import { Input, DatePicker, Button, message } from 'antd';
import PageHeader from '@/components/pageHeader';
import { useLocation, connect, ConnectProps, useParams } from 'umi';
import sharedStyles from '@/assets/styles.css';
import {
  ActivityModelState,
  createAddPushGiftInput,
  createSetPushGiftInputLevel,
  createSetPushGiftInputName,
  createSetPushGiftInputStuNum,
  createCommitPushGift,
} from '@/models/activity';
import styles from '../activity.css';
import { parse } from 'query-string';
import GiftInfoInput from '@/components/giftInfoInput';

type ConnectState = {
  activity: ActivityModelState;
};

type Props = ConnectState & ConnectProps;

const Update = ({ activity, dispatch }: Props) => {
  const { title } = parse(useLocation().search);
  const { info } = useParams();
  // TODO: 获取历史信息作为初始化
  const [location, setLocation] = useState<string>('');
  const [timeBegin, setTimeBegin] = useState<number>();
  const [timeEnd, setTimeEnd] = useState<number>();
  const [timeOut, setTimeOut] = useState<number>();

  return (
    <div>
      <PageHeader title="新活动推送编辑"></PageHeader>
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.inputWrapper} style={{ margin: 0 }}>
          <span className={sharedStyles.name}>活动名称</span>
          {title}
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>领奖地点</span>
          <Input
            className={sharedStyles.inputBorder}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>领奖时间</span>
          <DatePicker.RangePicker
            showTime
            className={sharedStyles.inputBorder}
            onCalendarChange={dates => {
              if (dates) {
                setTimeBegin(dates[0]?.unix());
                setTimeEnd(dates[1]?.unix());
              }
            }}
          />
          <span className={styles.dateTip}>
            请输入可领取奖品时间，例如：比如9点-11点，14点-17点
          </span>
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>推送时间</span>
          <DatePicker
            showTime
            className={sharedStyles.inputBorder}
            onChange={date => {
              setTimeOut(date?.unix());
            }}
          />
        </div>
        {activity.pushGiftInputs.map((info, index) => (
          <GiftInfoInput
            key={index}
            onChangeGiftInputLevel={(level: number) => {
              dispatch!(createSetPushGiftInputLevel(index, level));
            }}
            onChangeGiftInputName={(name: string) => {
              dispatch!(createSetPushGiftInputName(index, name));
            }}
            onChangeGiftInputStuNum={(stuNum: string) => {
              dispatch!(createSetPushGiftInputStuNum(index, stuNum));
            }}
          />
        ))}
        <div
          className={styles.add}
          onClick={() => dispatch!(createAddPushGiftInput())}
        >
          + 添加该活动其他等级奖品
        </div>
        <Button
          type="primary"
          style={{ marginBottom: 20 }}
          className={sharedStyles.okButton}
          onClick={() => {
            if (info && timeBegin && timeEnd && timeOut) {
              dispatch!(
                createCommitPushGift(
                  parseInt(info, 10),
                  location,
                  timeBegin,
                  timeEnd,
                  timeOut,
                  activity.pushGiftInputs,
                ),
              );
            } else {
              message.warn('请填写完整推送信息');
            }
          }}
        >
          完成
        </Button>
      </div>
    </div>
  );
};

export default connect((state: ConnectState) => ({
  activity: state.activity,
}))(Update);
