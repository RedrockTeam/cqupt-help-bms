import React, { useState } from 'react';
import { Input, DatePicker, Button, message } from 'antd';
import PageHeader from '@/components/pageHeader';
import { useLocation, connect, ConnectProps, useParams } from 'umi';
import moment from 'moment'
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
  // const [location, setLocation] = useState<string>(() => activity.location);

  const location = activity.location
  const setLocation = (l: any) => dispatch!({
    type: 'activity/setLocationAndTime',
    payload: {
      location: l,
      time_begin: activity.time_begin,
      time_end: activity.time_end,
      time_out: activity.time_out,
    },
  })
  // const [timeBegin, setTimeBegin] = useState<number | undefined>(() => activity.time_begin);
  const timeBegin = activity.time_begin
  const setTimeBegin = (t: any) => dispatch!({
    type: 'activity/setLocationAndTime',
    payload: {
      location: activity.location,
      time_begin: t,
      time_end: activity.time_end,
      time_out: activity.time_out,
    },
  })
  // const [timeEnd, setTimeEnd] = useState<number | undefined>(() => activity.time_end);
  const timeEnd = activity.time_end
  const setTimeEnd = (t: any) => dispatch!({
    type: 'activity/setLocationAndTime',
    payload: {
      location: activity.location,
      time_begin: activity.time_begin,
      time_end: t,
      time_out: activity.time_out,
    },
  })
  // const [timeOut, setTimeOut] = useState<number | undefined>(() => activity.time_out);
  const timeOut = activity.time_end
  const setTimeOut = (t: any) => dispatch!({
    type: 'activity/setLocationAndTime',
    payload: {
      location: activity.location,
      time_begin: activity.time_begin,
      time_end: activity.time_end,
      time_out: t,
    },
  })

  console.log(activity, timeEnd)

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
            value={location}
            className={sharedStyles.inputBorder}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>领奖时间</span>
          <DatePicker.RangePicker
            showTime
            value={[timeBegin !== 0 && timeBegin != null ? moment.unix(timeBegin) : null, timeEnd !== 0 && timeEnd != null ? moment.unix(timeEnd) : null]}
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
            value={timeOut !== 0 && timeOut != null ? moment.unix(timeOut) : null}
            className={sharedStyles.inputBorder}
            onChange={date => {
              setTimeOut(date?.unix());
            }}
          />
        </div>
        {activity.pushGiftInputs.map((info, index) => (
          <GiftInfoInput
            key={index}
            pushGiftInput={info}
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
