import React from 'react';
import { Link, connect, ConnectRC, Loading } from 'umi';
import { Table } from 'antd';
import styles from './user.css';
import PageHeader from '@/components/pageHeader';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import sharedStyles from '@/assets/styles.css';
import { UserModelState } from '@/models/user';

const columns = [
  { title: '活动任务', dataIndex: 'title', key: 'title' },
  { title: '发布时间', dataIndex: 'updated_time', key: 'updated_time' },
  { title: '发布人', dataIndex: 'name', key: 'name' },
];

type PageProps = {
  user: UserModelState;
  loading: boolean;
};

const User: ConnectRC<PageProps> = ({ user, loading }) => {
  return (
    <div>
      <PageHeader title="部门公告">
        <PageHeaderBtn type="history">
          <Link to="/user/history" className={sharedStyles.pageHeaderBtn}>
            操作记录
          </Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender(record) {
            return <p className={styles.description}>{record.content}</p>;
          },
          expandIconColumnIndex: 3,
        }}
        dataSource={user.tasks.map(task => ({ ...task, key: task.id }))}
        scroll={{
          y: '76vh',
        }}
        loading={loading}
        expandRowByClick
      />
    </div>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    user,
    loading: loading.effects['user/fetchUserTasks']!,
  }),
)(User);
