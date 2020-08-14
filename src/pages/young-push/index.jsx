import React, { useState, useEffect, useRef } from 'react';
import { Link, connect, Loading, ConnectRC, useHistory, request } from 'umi';
import {
  Table,
  Button,
  Checkbox,
  Modal,
  Steps,
  Input,
  DatePicker,
  Result,
} from 'antd';
import PageHeader from '@/components/pageHeader';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import sharedStyles from '@/assets/styles.css';
import styles from './index.css';
import { createSendPassApply, createFetchCurrentInfo } from '@/models/young';
import bishiImg from '@/assets/bishi.png';
import bishiActiveImg from '@/assets/bishi-active.png';
import mianshiImg from '@/assets/mianshi.png';
import mianshiActiveImg from '@/assets/mianshi-active.png';
import luquImg from '@/assets/luqu.png';
import luquActiveImg from '@/assets/luqu-active.png';
import { redirectTo } from '@/utils';

const PushFormChoice = ({ pushForm, setPushForm }) => (
  <div>
    <h1 className={styles.pushTitle}>请选择形式</h1>
    <div className={styles.pushContent}>
      <div
        className={`${styles.pushChoice} ${styles.mianshi} ${
          pushForm === 1 ? styles.mianshiActive : ''
        }`}
        onClick={() => setPushForm(1)}
      ></div>
      <div
        className={`${styles.pushChoice} ${styles.bishi} ${
          pushForm === 2 ? styles.bishiActive : ''
        }`}
        onClick={() => setPushForm(2)}
      ></div>
      <div
        className={`${styles.pushChoice} ${styles.luqu} ${
          pushForm === 3 ? styles.luquActive : ''
        }`}
        onClick={() => setPushForm(3)}
      ></div>
    </div>
  </div>
);
const PushInfo = ({
  pushForm,
  location,
  setLocation,
  name,
  setName,
  time,
  setTime,
  phone,
  setPhone,
  setGroupNumber,
}) => {
  if (pushForm === 3)
    return (
      <div className={styles.contentWrapper}>
        <div className={styles.inputWrapper}>
          <span className={styles.name}>部门群号</span>
          <Input
            className={`${sharedStyles.inputBorder} ${styles.contentItem}`}
            onChange={e => setGroupNumber(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <span className={styles.name}>联系人姓名</span>
          <Input
            className={`${sharedStyles.inputBorder} ${styles.contentItem}`}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <span className={styles.name}>联系人电话</span>
          <Input
            className={`${sharedStyles.inputBorder} ${styles.contentItem}`}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      </div>
    );
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.inputWrapper}>
        <span className={styles.name}>
          {pushForm === 1 ? '面试时间' : '笔试时间'}
        </span>
        <DatePicker
          showTime
          className={`${sharedStyles.inputBorder} ${styles.contentItem}`}
          onChange={setTime}
        />
      </div>
      <div className={styles.inputWrapper}>
        <span className={styles.name}>联系人姓名</span>
        <Input
          value={name}
          className={`${sharedStyles.inputBorder} ${styles.contentItem}`}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <span className={styles.name}>
          {pushForm === 1 ? '面试地点' : '笔试地点'}
        </span>
        <Input
          value={location}
          className={`${sharedStyles.inputBorder} ${styles.contentItem}`}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <span className={styles.name}>联系人电话</span>
        <Input
          value={phone}
          className={`${sharedStyles.inputBorder} ${styles.contentItem}`}
          onChange={e => {
            if (/^\d{0,11}$/.test(e.target.value)) {
              setPhone(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};
const PushCheck = ({ young, pushForm, time, name, location, phone }) => {
  if (pushForm === 3) {
    return (
      <div>
        <div className={styles.pushTextTitle}>
          推送信息将会以短信的方式，发送至用户的手机、重邮小帮手、青春邮约-录取结果处，请确定信息的真实性！
        </div>
        <div className={styles.pyshTextContent}>
          亲爱的同学，恭喜您通过了{young.teamInfo.name}
          的招新筛选，成为我们部门的一员，请尽快添加QQ群：{name}
          ，入群申请时请按照格式：学院-姓名 加入该部门
        </div>
      </div>
    );
  }
  const form = pushForm === 1 ? '面' : '笔';

  return (
    <div>
      <div className={styles.pushTextTitle}>
        推送信息将会以短信的方式，发送至用户的手机、重邮小帮手、青春邮约-录取结果处，请确定信息的真实性！
      </div>
      <div className={styles.pushTextContent}>
        亲爱的同学，欢迎您报名<span>{young.teamInfo.name}</span>，请您准时于
        <span>{time._d.toLocaleString()}</span>，至<span>{location}</span>参与
        <span>{form}试</span>，若由于时间原因无法参与本场{form}
        试，请在面试最终截止时间之前，联系
        <span>{name}</span>，联系人电话号码为<span>{phone}</span>。预祝您{form}
        试顺利～
      </div>
      <div className={styles.tips}>
        请在报名时间截止后，一次性推送完信息，发送推送后将不能再次发送本场{form}
        试的推送
      </div>
    </div>
  );
};
const PushOk = () => null;

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '学号', dataIndex: 'stu_num', key: 'stu_num' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
];

const YoungPush = ({ young, loading, dispatch }) => {
  const history = useHistory();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [pushStep, setPushStep] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [pushForm, setPushForm] = useState();
  const list = young.current.data;
  const step = young.current.step;

  const [time, setTime] = useState();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [groupNumber, setGroupNumber] = useState('');

  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    request('/team/apply/done').then(res => {
      if (res.status === 10000) {
        setIsEnd(res.data);
      }
    });
  }, []);

  // 看能不能修改
  const [canUpdate, setCanUpdate] = useState(false);
  useEffect(() => {
    request('/team/apply/update').then(res => {
      if (res.status === 10000) {
        setCanUpdate(true);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedIds.length === list.length) {
      if (selectedIds.length === 0) return setIsChecked(false);
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [list.length, selectedIds.length]);
  const selectAll = () => {
    if (isChecked) {
      setSelectedIds([]);
    } else {
      setSelectedIds(list.map(e => e.id));
    }
  };

  const renderPushContent = () => {
    if (pushStep === 0)
      return <PushFormChoice pushForm={pushForm} setPushForm={setPushForm} />;
    if (pushStep === 1)
      return (
        <PushInfo
          pushForm={pushForm}
          location={location}
          setLocation={setLocation}
          name={name}
          setName={setName}
          time={time}
          setTime={setTime}
          phone={phone}
          setPhone={setPhone}
          setGroupNumber={setGroupNumber}
        />
      );
    if (pushStep === 2)
      return (
        <PushCheck
          young={young}
          pushForm={pushForm}
          time={time}
          name={name}
          location={location}
          phone={phone}
        />
      );
    if (pushStep === 3) return <PushOk />;
  };

  if (isEnd) {
    redirectTo('/young-push/history');
  }
  return (
    <div>
      <PageHeader title={`第 ${step} 轮选拔推送名单`}>
        <PageHeaderBtn type="history">
          <Link to="/young-push/history" className={sharedStyles.pageHeaderBtn}>
            已推送名单
          </Link>
        </PageHeaderBtn>
      </PageHeader>
      <div className={styles.wrapper}>
        <Table
          rowSelection={{
            selectedRowKeys: selectedIds,
            onChange(keys) {
              setSelectedIds(keys);
            },
          }}
          pagination={{
            className: styles.pagination,
          }}
          columns={columns}
          loading={loading}
          dataSource={list.map(i => ({ ...i, key: i.id }))}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
            position: 'relative',
          }}
        >
          <Checkbox
            className={styles.checkAll}
            onChange={selectAll}
            checked={isChecked}
          >
            <span className={styles.con}>所有页面全选</span>
          </Checkbox>
          <Button
            type="primary"
            disabled={!selectedIds.length || !canUpdate}
            onClick={() => setIsShow(true)}
            className={sharedStyles.okButton}
          >
            发送推送
          </Button>
        </div>
      </div>

      <Modal
        title={`第 ${step} 轮推送信息录入`}
        visible={isShow}
        className={styles.modal}
        footer={
          pushStep === 3 ? (
            <Button
              type="primary"
              style={{ margin: '20px 0', background: '#fff', color: '#6B83FF' }}
              className={sharedStyles.okButton}
              onClick={() => {
                setIsShow(false);
                setPushStep(0);
                setTime();
                setName('');
                setLocation('');
                setGroupNumber('');
                setPhone('');
                setPushForm();
                setSelectedIds([]);
                dispatch(createFetchCurrentInfo());
                history.replace('/young-push');
              }}
            >
              关闭
            </Button>
          ) : (
            <div>
              <Button
                type="primary"
                style={{
                  margin: '20px 0',
                  background: '#fff',
                  color: '#6B83FF',
                }}
                disabled={!(pushStep > 0)}
                className={sharedStyles.okButton}
                onClick={() => {
                  if (pushStep > 0) {
                    setPushStep(pushStep - 1);
                  }
                }}
              >
                上一步
              </Button>
              <Button
                type="primary"
                style={{ margin: '20px 0px 20px 40px' }}
                className={sharedStyles.okButton}
                disabled={
                  !(
                    (pushStep === 0 && pushForm) ||
                    (pushStep === 1 &&
                      name &&
                      phone &&
                      ((location && time) || groupNumber)) ||
                    pushStep === 2 ||
                    pushStep === 3
                  )
                }
                onClick={() => {
                  if (pushStep < 3) {
                    if (pushStep === 2) {
                      console.log(time);
                      let data;
                      if (pushForm === 3) {
                        data = {
                          link_name: name,
                          link_phone: phone,
                          group_number: groupNumber,
                          send_type: pushForm,
                          step,
                          ids: selectedIds,
                        };
                      } else {
                        data = {
                          time: time.unix(),
                          location,
                          link_name: name,
                          link_phone: phone,
                          send_type: pushForm,
                          step,
                          ids: selectedIds,
                        };
                      }
                      dispatch(createSendPassApply(data));
                    }
                    setPushStep(pushStep + 1);
                  }
                }}
              >
                {pushStep === 2 ? '完成' : '下一步'}
              </Button>
            </div>
          )
        }
        onCancel={() => {
          setIsShow(false);
          setPushStep(0);
          setTime();
          setName('');
          setLocation('');
          setGroupNumber('');
          setPhone('');
          setPushForm();
        }}
      >
        <div>
          {pushStep === 3 ? (
            <Result status="success" title={`第${step}场选拔名单推送成功`} />
          ) : (
            <div className={styles.steps}>
              <Steps current={pushStep} size="small">
                <Steps.Step title="推送形式" />
                <Steps.Step title="信息录入" />
                <Steps.Step title="信息核对" />
              </Steps>
            </div>
          )}
          {renderPushContent()}
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ young, loading }) => ({
  young,
  loading: loading.effects['young/fetchCurrentInfo'],
}))(YoungPush);
