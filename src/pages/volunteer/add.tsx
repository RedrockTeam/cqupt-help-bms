import React, { useState } from 'react';
import { connect, ConnectProps } from 'umi';
import { Input, DatePicker, Button, message } from 'antd';
import PageHeader from '@/components/pageHeader';
import sharedStyles from '@/assets/styles.css';
import styles from './volunteer.css';
import { createAddVolunteerActivity } from '@/models/volunteer';

type Props = ConnectProps;

const AddVolunteerActivity = ({ dispatch }: Props) => {
  const [name, setName] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [date, setDate] = useState<number>();
  const [lastDate, setLastDate] = useState<number>();
  const [num, setNum] = useState<number>(0);

  return (
    <div>
      <PageHeader title="新建活动"></PageHeader>
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.inputWrapper} style={{ margin: 0 }}>
          <span className={sharedStyles.name}>活动名称</span>
          <Input
            className={sharedStyles.inputBorder}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>活动介绍</span>
          <Input
            className={sharedStyles.inputBorder}
            maxLength={10}
            onChange={e => setIntroduction(e.target.value)}
          />
        </div>
        <div
          className={sharedStyles.inputWrapper}
          style={{ alignItems: 'flex-start' }}
        >
          <span className={`${sharedStyles.name} ${styles.textName}`}>
            活动规则
          </span>
          <Input.TextArea
            className={styles.textInput}
            cols={4}
            maxLength={50}
            onChange={e => setRole(e.target.value)}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>志愿时长</span>
          <Input
            className={sharedStyles.inputBorder}
            onChange={e => setHour(e.target.value)}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>活动日期</span>
          <DatePicker
            className={sharedStyles.inputBorder}
            onChange={date => {
              console.log(date?.unix());
              setDate(date?.unix());
            }}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>志愿人数</span>
          <Input
            className={sharedStyles.inputBorder}
            type="number"
            onChange={e => setNum(parseInt(e.target.value, 10))}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>报名截止时间</span>
          <DatePicker
            showTime
            className={sharedStyles.inputBorder}
            onChange={date => {
              console.log(date?.unix());
              setLastDate(date?.unix());
            }}
          />
        </div>
        <div style={{ color: '#FF3B3B' }}>该时间应该在志愿日期之前</div>
        <Button
          type="primary"
          style={{ margin: '20px 0' }}
          className={sharedStyles.okButton}
          onClick={() => {
            if (
              date &&
              lastDate &&
              name.length &&
              introduction.length &&
              role.length &&
              hour.length &&
              num
            ) {
              dispatch!(
                createAddVolunteerActivity({
                  name,
                  introduction,
                  role,
                  hour,
                  date,
                  last_date: lastDate,
                  num,
                }),
              );
            } else {
              message.warn('请填写完整信息');
            }
          }}
        >
          完成
        </Button>
      </div>
    </div>
  );
};

export default connect()(AddVolunteerActivity);
