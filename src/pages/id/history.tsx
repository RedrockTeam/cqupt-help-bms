import React from 'react';
import { connect, ConnectRC, Loading } from 'umi';
import { Table } from 'antd';
import PageHeader from '@/components/pageHeader';
import { IdInfo } from '@/interfaces/id';
import styles from './id.css';
import { IdModelState } from '@/models/id';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '学号', dataIndex: 'stu_num', key: 'stu_num' },
  { title: '性别', dataIndex: 'sex', key: 'sex' },
  { title: '学院', dataIndex: 'college', key: 'college' },
  {
    title: '社团',
    dataIndex: 'team_name',
    key: 'team_name',
    sorter: (a: IdInfo, b: IdInfo) => a.team_name.length - b.team_name.length,
  },
];

type PageProps = {
  id: IdModelState;
  loading: boolean;
};

const IdHistory: ConnectRC<PageProps> = ({ id, loading }) => {
  return (
    <div>
      <PageHeader title="通过名单"></PageHeader>
      <div className={styles.wrapper}>
        <Table
          columns={columns}
          pagination={{
            className: styles.pagination,
          }}
          loading={loading}
          dataSource={id.passList.map(i => ({ ...i, key: i.id }))}
        />
      </div>
    </div>
  );
};

export default connect(
  ({ id, loading }: { id: IdModelState; loading: Loading }) => ({
    id,
    loading: loading.effects['id/fetchPassedIdInfos']!,
  }),
)(IdHistory);
