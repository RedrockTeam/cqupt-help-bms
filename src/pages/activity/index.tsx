import React, { useState, useCallback } from 'react';
import { Link, useHistory, connect, ConnectRC, Loading } from 'umi';
import { Table, Modal, Button, Form, DatePicker, Input, Select } from 'antd';
import PageHeader from '@/components/pageHeader';
import styles from './activity.css';
import sharedStyles from '@/assets/styles.css';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  ActivityModelState,
  createDeleteActivity,
  createAddActivity,
} from '@/models/activity';
import ImageUploader from '@/components/imageUploader';

type PageProps = {
  activity: ActivityModelState;
  loading: boolean;
};

const Activity: ConnectRC<PageProps> = ({ dispatch, activity, loading }) => {
  const history = useHistory();
  const [visible, setVisible] = useState<boolean>(false);
  const [isOnlineForm, setIsOnlineForm] = useState<boolean>();
  const [image, setImage] = useState('');

  const closeModal = useCallback(() => setVisible(false), []);
  const submit = (values: any) => {
    dispatch!(
      createAddActivity({
        ...values,
        time_done: values.time_done.unix(),
        image,
      }),
    );
    closeModal();
  };
  const deleteActivity = (record: any) => {
    Modal.confirm({
      title: '确认删除这个活动吗？',
      icon: <ExclamationCircleOutlined />,
      // content: '',
      onOk() {
        dispatch!(createDeleteActivity(record.id));
      },
    });
  };

  return (
    <div>
      <PageHeader title="活动奖品推送中心">
        <PageHeaderBtn type="add" onClick={() => setVisible(true)}>
          <span className={sharedStyles.pageHeaderBtn}>新建活动</span>
        </PageHeaderBtn>
        <PageHeaderBtn type="history">
          <Link to="/activity/history" className={sharedStyles.pageHeaderBtn}>
            历史记录
          </Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        pagination={false}
        dataSource={activity.activityInfos.map(a => ({ ...a, key: a.id }))}
        scroll={{
          y: '76vh',
        }}
        loading={loading}
        onRow={record => ({
          onClick: () =>
            history.push(`/activity/${record.id}?title=${record.name}`),
        })}
      >
        <Table.Column title="活动名称" dataIndex="name" key="name" />
        <Table.Column title="活动形式" dataIndex="form" key="form" />
        <Table.Column title="创建人" dataIndex="username" key="username" />
        <Table.Column
          title="创建时间"
          dataIndex="create_time"
          key="create_time"
        />
        <Table.Column
          title="操作"
          key="operate"
          render={record => (
            <div>
              <Link
                to={`/activity/${record.id}/update?title=${record.name}`}
                onClick={e => e.stopPropagation()}
              >
                <span className={styles.update}>修改</span>
              </Link>
              <span
                onClick={e => {
                  e.stopPropagation();
                  deleteActivity(record);
                }}
                className={styles.delete}
              >
                删除
              </span>
            </div>
          )}
        />
      </Table>
      <Modal
        title="新建活动申请"
        visible={visible}
        centered
        onCancel={closeModal}
        footer={null}
      >
        <Form name="modal-form" onFinish={submit} layout="vertical">
          <Form.Item
            name="title"
            label="活动名称"
            rules={[{ required: true, message: '请填写活动名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time_done"
            label="下线时间"
            rules={[{ required: true, message: '请选择时间' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="type"
            label="活动形式"
            rules={[{ required: true, message: '请选择活动形式' }]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择活动形式"
              optionFilterProp="children"
              onChange={value => {
                setIsOnlineForm(value === '线上活动');
              }}
            >
              <Select.Option value="线上活动">线上活动</Select.Option>
              <Select.Option value="线下活动">线下活动</Select.Option>
            </Select>
          </Form.Item>
          {isOnlineForm !== undefined &&
            (isOnlineForm ? (
              <Form.Item
                name="link"
                label="活动链接"
                rules={[{ required: true, message: '请写明活动链接' }]}
              >
                <Input placeholder="例：https://ahabhgk.github.io/welcome-2019-PC/#/" />
              </Form.Item>
            ) : (
              <>
                <Form.Item
                  name="introduction"
                  label="活动介绍"
                  rules={[{ required: true, message: '请输入活动介绍' }]}
                >
                  <Input.TextArea placeholder="请输入本次活动的介绍（不超过 200 字）" />
                </Form.Item>
                <Form.Item
                  name="role"
                  label="活动规则"
                  rules={[{ required: true, message: '请输入活动规则' }]}
                >
                  <Input.TextArea
                    placeholder="请输入本次活动的规则（不超过 200 字）"
                    maxLength={200}
                  />
                </Form.Item>
                <Form.Item
                  name="location"
                  label="活动地点"
                  rules={[{ required: true, message: '请输入地点' }]}
                >
                  <Input.TextArea placeholder="请输入本次活动的地点" />
                </Form.Item>
              </>
            ))}
          <Form.Item name="image" label="活动宣传图">
            <ImageUploader image={image} setImage={setImage} />
            <div>请上传 16:9 大小图片</div>
          </Form.Item>
          <Form.Item
            name="time"
            label="活动时间"
            rules={[{ required: true, message: '请写明活动时间' }]}
          >
            <Input.TextArea placeholder="请输入本次活动时间，例：3 月 12 日 - 3 月 15 日，每天 18 - 20 点" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={sharedStyles.okButton}
            >
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(
  ({
    activity,
    loading,
  }: {
    activity: ActivityModelState;
    loading: Loading;
  }) => ({
    activity,
    loading: loading.effects['activity/fetchActivityInfos']!,
  }),
)(Activity);
