import React, { useState } from 'react';
import { connect, ConnectProps, useParams, Link } from 'umi';
import { Input, DatePicker, Button, message } from 'antd';
import PageHeader from '@/components/pageHeader';
import sharedStyles from '@/assets/styles.css';
import styles from '../volunteer.css';
import { createUpdateVolunteerActivity } from '@/models/volunteer';
import { VolunteerModelState } from '@/models/volunteer';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import moment from 'moment';

type ConnectState = {
  volunteer: VolunteerModelState;
};

type Props = ConnectProps & ConnectState;

const AddVolunteerActivity = ({ volunteer, dispatch }: Props) => {
  const { info } = useParams();
  const id = parseInt(info!, 10);
  const [thisOne] = volunteer.volunteerActivities.filter(t => t.id === id);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  const [name, setName] = useState<string>(thisOne.name);
  const [introduction, setIntroduction] = useState<string>(
    thisOne.introduction,
  );
  const [role, setRole] = useState<string>(thisOne.role);
  const [hour, setHour] = useState<string>(thisOne.hour);
  const [date, setDate] = useState<number>(thisOne.date);
  const [num, setNum] = useState<number>(thisOne.num);

  return (
    <div>
      <PageHeader title="新建活动">
        <PageHeaderBtn type="add">
          <span
            onClick={() => setIsUpdateMode(true)}
            className={sharedStyles.pageHeaderBtn}
          >
            修改
          </span>
        </PageHeaderBtn>
        <PageHeaderBtn type="history">
          <Link
            to={`/volunteer/${id}/volunteerInfo`}
            className={sharedStyles.pageHeaderBtn}
          >
            志愿者名单
          </Link>
        </PageHeaderBtn>
      </PageHeader>
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.inputWrapper} style={{ margin: 0 }}>
          <span className={sharedStyles.name}>活动名称</span>
          <Input
            value={name}
            className={sharedStyles.inputBorder}
            onChange={e => setName(e.target.value)}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>活动介绍</span>
          <Input
            value={introduction}
            className={sharedStyles.inputBorder}
            maxLength={10}
            onChange={e => setIntroduction(e.target.value)}
            disabled={!isUpdateMode}
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
            value={role}
            className={styles.textInput}
            cols={4}
            maxLength={50}
            onChange={e => setRole(e.target.value)}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>志愿时长</span>
          <Input
            value={hour}
            className={sharedStyles.inputBorder}
            onChange={e => setHour(e.target.value)}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>活动日期</span>
          <DatePicker
            showTime
            value={moment.unix(date)}
            className={sharedStyles.inputBorder}
            onChange={date => {
              if (date) {
                setDate(date?.unix());
              }
            }}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>志愿人数</span>
          <Input
            className={sharedStyles.inputBorder}
            value={num}
            type="number"
            onChange={e => setNum(parseInt(e.target.value, 10))}
            disabled={!isUpdateMode}
          />
        </div>
        {isUpdateMode ? (
          <Button
            type="primary"
            style={{ margin: '20px 0' }}
            className={sharedStyles.okButton}
            onClick={() => {
              console.log(
                date,
                name.length,
                introduction.length,
                role.length,
                hour.length,
                num,
              );
              if (
                date &&
                name.length &&
                introduction.length &&
                role.length &&
                hour.length &&
                num
              ) {
                dispatch!(
                  createUpdateVolunteerActivity({
                    id,
                    name,
                    introduction,
                    role,
                    hour,
                    date,
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
        ) : null}
      </div>
    </div>
  );
};

export default connect((state: ConnectState) => ({
  volunteer: state.volunteer,
}))(AddVolunteerActivity);
