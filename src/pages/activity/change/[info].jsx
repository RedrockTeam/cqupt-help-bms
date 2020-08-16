import React, { useState } from 'react';
import { connect, Link, useLocation, request, useParams } from 'umi';
import {
  Button,
  DatePicker,
  Input,
  Form,
  Select,
  message,
  Result,
  Skeleton,
} from 'antd';
import { parse } from 'query-string';
import PageHeader from '@/components/pageHeader';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import sharedStyles from '@/assets/styles.css';
import styles from '../activity.css';
import ImageUploader from '@/components/imageUploader';
import { useEffect } from 'react';
import moment from 'moment';

const Change = () => {
  const id = parseInt(useParams().info, 10);

  const [title, setTitle] = useState('');
  const [form, setForm] = useState();
  const [image, setImage] = useState('');
  const [timeDone, setTimeDone] = useState('');
  const [link, setLink] = useState('');
  const [time, setTime] = useState([]);
  const [location, setLocation] = useState('');
  const [rule, setRule] = useState('');
  const [intro, setIntro] = useState('');

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    request('/activity/activity/detail', {
      method: 'POST',
      body: JSON.stringify({
        activity_id: id,
      }),
    })
      .then(res => {
        if (res.status === 10000) {
          const times = res.data.time.split(' - ');
          setTitle(res.data.title);
          setForm(res.data.type);
          setImage(res.data.image);
          setTimeDone(res.data.time_done);
          setTime([moment(times[0]), moment(times[1])]);
          setLocation(res.data.location);
          setRule(res.data.role);
          setIntro(res.data.introduction);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async () => {
    let res;
    let timeStr = `${time[0].format('YYYY-MM-DD hh:mm:ss')} - ${time[1].format(
      'YYYY-MM-DD hh:mm:ss',
    )}`;
    if (form === 1) {
      res = await request('/activity/activity/update', {
        method: 'POST',
        body: JSON.stringify({
          activity_id: id,
          operation: 'update',
          image,
          link,
          time: timeStr,
        }),
      });
    } else {
      res = await request('/activity/activity/update', {
        method: 'POST',
        body: JSON.stringify({
          activity_id: id,
          operation: 'update',
          image,
          introduction: intro,
          role: rule,
          location,
          time: timeStr,
        }),
      });
    }
    if (res.status === 10000) {
      message.success('修改成功');
    }
    setIsUpdateMode(false);
  };

  if (loading)
    return (
      <div>
        <PageHeader title={title}></PageHeader>
        <div className={sharedStyles.wrapper}>
          <Skeleton />
        </div>
      </div>
    );
  if (error)
    return (
      <div>
        <PageHeader title={title}></PageHeader>
        <div className={sharedStyles.wrapper}>
          <Result status="error" subTitle="Sorry, something went wrong." />
        </div>
      </div>
    );
  return (
    <div>
      <PageHeader title={title}></PageHeader>
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.inputWrapper} style={{ margin: 0 }}>
          <span className={sharedStyles.name}>活动名称</span>
          {title}
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>下线时间</span>
          {moment.unix(timeDone).format('YYYY-MM-DD hh:mm:ss')}
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>活动形式</span>
          {form === 1 ? '线上活动' : '线下活动'}
        </div>
        {form === 1 ? (
          <div className={sharedStyles.inputWrapper}>
            <span className={sharedStyles.name}>活动链接</span>
            <Input
              value={link}
              className={sharedStyles.inputBorder}
              onChange={e => setLink(e.target.value)}
              disabled={!isUpdateMode}
            />
          </div>
        ) : (
          <>
            <div className={sharedStyles.inputWrapper}>
              <span className={sharedStyles.name}>活动介绍</span>
              <Input.TextArea
                placeholder="请输入本次活动的介绍（不超过 200 字）"
                value={intro}
                className={styles.text}
                onChange={e => setIntro(e.target.value)}
                disabled={!isUpdateMode}
                maxLength={200}
              />
              <div className={styles.numTip}>{intro.length}/200</div>
            </div>
            <div className={sharedStyles.inputWrapper}>
              <span className={sharedStyles.name}>活动规则</span>
              <Input.TextArea
                placeholder="请输入本次活动的规则（不超过 200 字）"
                value={rule}
                className={styles.text}
                onChange={e => setRule(e.target.value)}
                disabled={!isUpdateMode}
                maxLength={200}
              />
              <div className={styles.numTip}>{rule.length}/200</div>
            </div>
            <div className={sharedStyles.inputWrapper}>
              <span className={sharedStyles.name}>活动地点</span>
              <Input.TextArea
                placeholder="请输入本次活动的地点（不超过 16 字）"
                value={location}
                className={styles.text}
                onChange={e => setLocation(e.target.value)}
                onCompositionEnd={e =>
                  setLocation(
                    e.target.value.length > 16
                      ? e.target.value.slice(0, 16)
                      : e.target.value,
                  )
                }
                disabled={!isUpdateMode}
                maxLength={16}
              />
              <div className={styles.numTip}>{location.length}/16</div>
            </div>
          </>
        )}
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>活动时间</span>
          <DatePicker.RangePicker
            className={sharedStyles.inputBorder}
            disabled={!isUpdateMode}
            value={time}
            onCalendarChange={dates => {
              if (dates) {
                setTime(dates);
              }
            }}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>活动宣传图</span>
          <ImageUploader
            image={image}
            setImage={setImage}
            className={styles.changeImg}
            disabled={!isUpdateMode}
          />
          <div style={{ alignSelf: 'flex-end', marginBottom: '6px' }}>
            请上传 16:9 大小图片
          </div>
        </div>
        <Button
          type="primary"
          onClick={isUpdateMode ? submit : () => setIsUpdateMode(true)}
          style={{ margin: '15px 0' }}
          className={sharedStyles.okButton}
        >
          {isUpdateMode ? '提交修改信息' : '修改活动信息'}
        </Button>
      </div>
    </div>
  );
};

export default connect(({ activity, loading }) => ({
  activity,
  loading: loading.effects['activity/fetchActivityDetailInfos'],
}))(Change);
