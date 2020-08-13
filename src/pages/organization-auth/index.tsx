import React, { useState } from 'react';
import { connect, ConnectRC, Loading } from 'umi';
import {
  OrganizationModelState,
  createUpdateAuth,
  createFetchCanAuthList,
} from '@/models/organization';
import PageHeader from '@/components/pageHeader';
import Member from '@/components/organizationMember';
import OrganizationPerson from '@/components/organizationPerson';
import sharedStyles from '@/assets/styles.css';
import { Modal, Button, Form, Radio, Skeleton } from 'antd';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

type PageProps = {
  organization: OrganizationModelState;
  loading: boolean;
};

// 先把添加成员的逻辑注释了
const OrganizationAuth: ConnectRC<PageProps> = ({
  organization,
  dispatch,
  loading,
}) => {
  // const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [jobId, setJobId] = useState<number>();
  const [originUserId, setOriginUserId] = useState<number>();

  // TODO: fix type
  const submitUpdate = (values: any) => {
    if (jobId && originUserId && values.authValue) {
      dispatch!(createUpdateAuth(jobId, values.authValue, originUserId));
    }
    closeUpdateModal();
  };
  const openUpdateModal = (jobId: number, originUserId: number) => {
    dispatch!(createFetchCanAuthList(jobId));
    setJobId(jobId);
    setOriginUserId(originUserId);
    setUpdateModalVisible(true);
  };
  const closeUpdateModal = () => setUpdateModalVisible(false);

  // const submit = (values: any) => {
  //   dispatch!({
  //     type: 'organization/addMember',
  //     payload: {
  //       stuNum: values.stu_num,
  //       job_id: jobId,
  //     }
  //   })
  //   close()
  // }
  // const close = () => setAddModalVisible(false)

  // useEffect(() => {
  //   setJobId(organization.members[1]?.job.job_id)
  // }, [organization.members])

  return (
    <div>
      <PageHeader title="权限管理" />
      <div className={sharedStyles.wrapper}>
        <Skeleton loading={loading}>
          {organization.auths.map((group, index) => (
            <Member key={group.job.job_id} title={group.job.job_name}>
              {group.TeamPersons == null ? (
                <div>暂无</div>
              ) : (
                group.TeamPersons.map(person => (
                  <OrganizationPerson
                    key={person.id}
                    onClick={() => openUpdateModal(group.job.job_id, person.id)}
                    person={person}
                  />
                ))
              )}
              {/* 添加，index === 0 是部长，没有添加，其他的当人数小于 2 时有添加 */}
              {/* {(index !== 0 && group.TeamPersons.length < 2) && <OrganizationPerson
                onClick={() => setAddModalVisible(true)}
                key={'add'}
              />} */}
            </Member>
          ))}
        </Skeleton>
      </div>

      {/* 修改权限的对话 Modal */}
      <Modal
        title="添加成员"
        visible={updateModalVisible}
        centered
        onCancel={closeUpdateModal}
        footer={null}
        destroyOnClose
      >
        <Form name="modal-form" onFinish={submitUpdate} layout="vertical">
          <Form.Item name="authValue" label="请选择权限获取人">
            <Radio.Group>
              {organization.canAuthList?.map(canAuth => (
                <Radio style={radioStyle} value={canAuth.id} key={canAuth.id}>
                  {canAuth.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加的对话 Modal */}
      {/* <Modal
        title="添加成员"
        visible={addModalVisible}
        centered
        onCancel={close}
        footer={null}
      >
        <Form name="modal-form" onFinish={submit} layout="vertical">
          <Form.Item
            name="stu_num"
            label="成员学号"
            rules={[{ required: true, message: '请填写学号', max: 10 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default connect(
  ({
    organization,
    loading,
  }: {
    organization: OrganizationModelState;
    loading: Loading;
  }) => ({
    organization,
    loading: loading.effects['organization/fetchAuths']!,
  }),
)(OrganizationAuth);
