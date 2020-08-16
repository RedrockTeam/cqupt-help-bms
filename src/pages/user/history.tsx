import React from 'react';
import { connect, Loading, ConnectRC } from 'umi';
import { Table } from 'antd';
import { UserModelState } from '@/models/user';
import PageHeader from '@/components/pageHeader';

const columns = [
  { title: '活动任务', dataIndex: 'detail', key: 'detail' },
  { title: '操作时间', dataIndex: 'created_at', key: 'created_at' },
  { title: '发布人', dataIndex: 'name', key: 'name' },
];

type PageProps = {
  user: UserModelState;
  loading: boolean;
};

const UserHistory: ConnectRC<PageProps> = ({ user, loading }) => {
  return (
    <div>
      <PageHeader title="操作记录" />
      <Table
        columns={columns}
        pagination={false}
        dataSource={user.histories.map(h => ({ ...h, key: h.id }))}
        scroll={{
          y: '76vh',
        }}
        loading={loading}
      />
    </div>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    user,
    loading: loading.effects['user/fetchUserHistories']!,
  }),
)(UserHistory);
