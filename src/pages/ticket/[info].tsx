import React, { useState } from 'react';
import { connect, ConnectProps, useParams } from 'umi';
import { Input, DatePicker, Button, message } from 'antd';
import PageHeader from '@/components/pageHeader';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import sharedStyles from '@/assets/styles.css';
import { createUpdateTicket, TicketModelState } from '@/models/ticket';
import moment from 'moment';
import ImageUploader from '@/components/imageUploader';

type ConnectState = {
  ticket: TicketModelState;
};

type Props = ConnectState & ConnectProps;

const AddTicket = ({ dispatch, ticket }: Props) => {
  const { info } = useParams();
  const id = parseInt(info!, 10);
  const [thisOne] = ticket.tickets.filter(t => t.id === id);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [name, setName] = useState<string>(thisOne.name);
  const [image, setImage] = useState<string>(thisOne.image);
  const [timePlay, setTimePlay] = useState<number>(thisOne.time_play);
  const [location, setLocation] = useState<string>(thisOne.location);
  const [timeOut, setTimeOut] = useState<number>(thisOne.time_out);
  const [num, setNum] = useState<number>(thisOne.num);

  return (
    <div>
      <PageHeader title="影票信息">
        <PageHeaderBtn type="add">
          <span
            onClick={() => {
              if (Math.floor(Date.now() / 1000) - timeOut < -(2 * 60 * 60)) {
                setIsUpdateMode(true)
              }
            }}
            className={sharedStyles.pageHeaderBtn}
          >
            修改
          </span>
        </PageHeaderBtn>
      </PageHeader>
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.inputWrapper} style={{ margin: 0 }}>
          <span className={sharedStyles.name}>电影名称</span>
          <Input
            value={name}
            className={sharedStyles.inputBorder}
            onChange={e => setName(e.target.value)}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <div className={sharedStyles.name} style={{ width: '4.2vw' }}>
            影票图片
          </div>
          <ImageUploader
            image={image}
            setImage={setImage}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>放映时间</span>
          <DatePicker
            showTime
            className={sharedStyles.inputBorder}
            onChange={date => {
              if (date) {
                setTimePlay(date.unix());
              }
            }}
            value={moment.unix(timePlay)}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>放映地点</span>
          <Input
            value={location}
            className={sharedStyles.inputBorder}
            onChange={e => setLocation(e.target.value)}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>抢票时间</span>
          <DatePicker
            showTime
            className={sharedStyles.inputBorder}
            onChange={date => {
              if (date) {
                setTimeOut(date.unix());
              }
            }}
            value={moment.unix(timeOut)}
            disabled={!isUpdateMode}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>放票数量</span>
          <Input
            value={num}
            className={sharedStyles.inputBorder}
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
              if (timePlay && timeOut) {
                dispatch!(
                  createUpdateTicket({
                    id,
                    name,
                    image,
                    time_play: timePlay,
                    location,
                    time_out: timeOut,
                    num,
                  }),
                );
                setIsUpdateMode(false);
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
  ticket: state.ticket,
}))(AddTicket);
