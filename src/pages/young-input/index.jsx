import React, { useState, useRef } from 'react';
import { connect, ConnectProps } from 'umi';
import PageHeader from '@/components/pageHeader';
import sharedStyles from '@/assets/styles.css';
import styles from './index.css';
import { Input, Button, Skeleton } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ImageUploader from '@/components/imageUploader';
import { createSetTeamInfo, createUpdateTeamInfo } from '@/models/young';
import { useEffect } from 'react';
import { usePrev } from '@/utils/index';

const YoungInput = ({ young, dispatch, loading }) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const handleChangeTeamInfo = teamInfo =>
    dispatch(createSetTeamInfo(teamInfo));

  // 判断是不是第一次填写信息
  const [isFirst, setIsFirst] = useState(false);
  const preLoading = usePrev(loading);
  useEffect(() => {
    if (preLoading === true && loading === false) {
      if (young.teamInfo.detail === '' && young.teamInfo.avatar === '')
        setIsFirst(true);
    }
  }, [loading, preLoading, young.teamInfo.avatar, young.teamInfo.detail]);

  if (loading)
    return (
      <div>
        <PageHeader title="部门信息填写" />
        <div className={sharedStyles.wrapper}>
          <Skeleton />
        </div>
      </div>
    );
  return (
    <div>
      <PageHeader title="部门信息填写" />
      <div className={sharedStyles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>部门名称</div>
          <div className={styles.unUpdateText}>{young.teamInfo.name}</div>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.title}>部门介绍</div>
          {isUpdateMode ? (
            <>
              <Input.TextArea
                className={styles.text}
                value={young.teamInfo.detail}
                onChange={e => {
                  handleChangeTeamInfo({
                    ...young.teamInfo,
                    detail: e.target.value,
                  });
                }}
                rows={6}
                maxLength={50}
              />
              <span className={styles.len}>
                {young.teamInfo.detail.length} / 50
              </span>
            </>
          ) : (
            <div className={styles.unUpdateText}>{young.teamInfo.detail}</div>
          )}
        </div>
        <div className={sharedStyles.inputWrapper}>
          <div className={styles.title}>宣传图片</div>
          <ImageUploader
            image={young.teamInfo.avatar}
            disabled={!isUpdateMode}
            setImage={url => {
              handleChangeTeamInfo({
                ...young.teamInfo,
                avatar: url,
              });
            }}
            className={styles.upload}
          />
          <div className={styles.tips}>请上传16:9大小的部门宣传图</div>
        </div>
        <Button
          type="primary"
          style={{ margin: '20px 0' }}
          className={sharedStyles.okButton}
          onClick={() => {
            if (isUpdateMode) {
              const updateTeamInfo = () =>
                dispatch(
                  createUpdateTeamInfo(
                    young.teamInfo.detail,
                    young.teamInfo.avatar,
                  ),
                );
              if (isFirst) {
                Modal.confirm({
                  title: '确定提交信息吗？',
                  icon: <ExclamationCircleOutlined />,
                  content:
                    '该部门信息资料将会上传至“重邮帮”微信小程序上，请注意信息的准确性！',
                  onOk() {
                    updateTeamInfo();
                  },
                });
              } else {
                updateTeamInfo();
              }
              setIsUpdateMode(false);
            } else {
              setIsUpdateMode(true);
            }
          }}
        >
          {isUpdateMode ? '提交信息' : '编辑信息'}
        </Button>
        <div style={{ marginBottom: '10px', color: '#FF3B3B' }}>
          {!isFirst ? '重邮帮小程序正式上线后将不可再编辑部门信息！' : ''}
        </div>
      </div>
    </div>
  );
};

export default connect(({ young, loading }) => ({
  young,
  loading: loading.effects['young/fetchTeamInfo'],
}))(YoungInput);
