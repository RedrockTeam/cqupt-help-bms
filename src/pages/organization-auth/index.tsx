import React, { useState, useEffect } from 'react';
import { connect, ConnectRC, Loading, request } from 'umi';
import {
  OrganizationModelState,
  createUpdateAuth,
  createFetchCanAuthList,
} from '@/models/organization';
import PageHeader from '@/components/pageHeader';
import Member from '@/components/organizationMember';
import OrganizationPerson from '@/components/organizationPerson';
import sharedStyles from '@/assets/styles.css';
import { Modal, Button, Form, Radio, Skeleton, Spin } from 'antd';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

type PageProps = {
  organization: OrganizationModelState;
  loading: boolean;
  canAuthLoading: boolean;
};

// 判断权限人数是否已满
const isFullAtJob = (job: string, num: number) => {
  if (job === '青春邮约报名系统推送者' || job === '影票上线推送者') {
    if (num >= 1) return true;
    return false;
  }
  if (num >= 2) return true;
  return false;
};

// 先把添加成员的逻辑注释了（不注释了，产品真的加了）
// 添加的逻辑跟 update 一样，一起处理了
const OrganizationAuth: ConnectRC<PageProps> = ({
  organization,
  dispatch,
  loading,
  canAuthLoading,
}) => {
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [jobId, setJobId] = useState<number>();
  const [originUserId, setOriginUserId] = useState<number>();

  // 能否修改
  const [isBoss, setIsBoss] = useState(false);
  useEffect(() => {
    request('/team/person/update').then(res => {
      if (res.status === 10000) {
        setIsBoss(true);
      }
    });
  }, []);

  // TODO: fix type
  const submitUpdate = (values: any) => {
    if (jobId && values.authValue) {
      let originId = 0;
      if (originUserId != null) {
        originId = originUserId; // 兼容添加逻辑
      }
      dispatch!(createUpdateAuth(jobId, values.authValue, originId));
    }
    closeUpdateModal();
  };
  const openUpdateModal = (jobId: number, originUserId?: number) => {
    if (!isBoss) return;
    dispatch!(createFetchCanAuthList(jobId));
    setJobId(jobId);
    setOriginUserId(originUserId);
    setUpdateModalVisible(true);
  };
  const closeUpdateModal = () => setUpdateModalVisible(false);

  return (
    <div>
      <PageHeader title="权限管理" />
      <div className={sharedStyles.wrapper}>
        <Skeleton loading={loading}>
          {organization.auths.map((group, index) => (
            <Member key={group.job.job_id} title={group.job.job_name}>
              {group.TeamPersons != null && group.TeamPersons.length !== 0 ? (
                group.TeamPersons.map(person => (
                  <OrganizationPerson
                    key={person.id}
                    onClick={() => openUpdateModal(group.job.job_id, person.id)}
                    person={person}
                  />
                ))
              ) : (
                <div>暂无</div>
              )}
              {/* 添加 */}
              {!group.job.job_name.includes('主席') &&
                !group.job.job_name.includes('指导老师') &&
                isBoss &&
                !isFullAtJob(
                  group.job.job_name,
                  group.TeamPersons?.length ?? 0,
                ) && (
                  <OrganizationPerson
                    onClick={() => {
                      openUpdateModal(group.job.job_id);
                      // setAddModalVisible(true);
                      setJobId(group.job.job_id);
                    }}
                    key={'add'}
                  />
                )}
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
        {canAuthLoading ? (
          <Spin />
        ) : (
          <Form name="modal-form" onFinish={submitUpdate} layout="vertical">
            <Form.Item name="authValue" label="请选择权限获取人">
              <Radio.Group>
                {organization.canAuthList?.map((canAuth, index) => (
                  <Radio
                    style={radioStyle}
                    value={canAuth.id}
                    key={`${canAuth.id}-${index}`}
                  >
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
        )}
      </Modal>
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
    canAuthLoading: loading.effects['organization/fetchCanAuthList']!,
  }),
)(OrganizationAuth);
