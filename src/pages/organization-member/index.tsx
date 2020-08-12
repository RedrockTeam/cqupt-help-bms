import React, { useState, useEffect } from 'react';
import { connect, ConnectRC, Loading } from 'umi';
import {
  OrganizationModelState,
  createAddMember,
  createDeleteMember,
} from '@/models/organization';
import PageHeader from '@/components/pageHeader';
import Member from '@/components/organizationMember';
import OrganizationPerson from '@/components/organizationPerson';
import sharedStyles from '@/assets/styles.css';
import { Modal, Input, Button, Form, Skeleton } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type PageProps = {
  organization: OrganizationModelState;
  loading: boolean;
};

const OrganizationMenber: ConnectRC<PageProps> = ({
  organization,
  dispatch,
  loading,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [jobId, setJobId] = useState<number>();
  // TODO: fix type
  const submit = (values: any) => {
    dispatch!(createAddMember(values.stu_num, jobId!));
    close();
  };
  const close = () => setVisible(false);

  // 用于获取部门成员的 jobId，用于后端接口
  useEffect(() => {
    setJobId(organization.members[1]?.job.job_id);
  }, [organization.members]);

  return (
    <div>
      <PageHeader title="部门成员" />
      <div className={sharedStyles.wrapper}>
        <Skeleton loading={loading}>
          {organization.members.map((group, index) => (
            <Member key={group.job.job_id} title={group.job.job_name}>
              {group.TeamPersons?.map(person => (
                <OrganizationPerson
                  onClick={() =>
                    Modal.confirm({
                      // 移除的对话 Modal
                      title: '请确认',
                      icon: <ExclamationCircleOutlined />,
                      content: '确认将该成员移出部门？',
                      onOk: () =>
                        dispatch!(
                          createDeleteMember(person.id, group.job.job_id),
                        ),
                    })
                  }
                  key={person.id}
                  person={person}
                />
              ))}
              {/* 添加，不带主席的都可以添加 */}
              {!group.job.job_name.includes('主席') && (
                <OrganizationPerson
                  onClick={() => setVisible(true)}
                  key={'add'}
                />
              )}
            </Member>
          ))}
        </Skeleton>
      </div>

      {/* 添加的对话 Modal */}
      <Modal
        title="添加成员"
        visible={visible}
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
    loading: loading.effects['organization/fetchMembers']!,
  }),
)(OrganizationMenber);
