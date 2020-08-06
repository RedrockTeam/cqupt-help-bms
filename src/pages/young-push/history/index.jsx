import React, { useState, useEffect } from 'react';
import { connect, ConnectRC, Loading, request } from 'umi';
import { Table } from 'antd';
import PageHeader from '@/components/pageHeader';
import styles from '../index.css';

const columns = [
  { title: '推送列表', dataIndex: 'step', key: 'step' },
  { title: '推送者', dataIndex: 'username', key: 'username' },
];

const YoungPushHistory = ({ history }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    request('/team/apply/step').then(res => {
      if (res.status === 10000) {
        setList(res.data);
      }
    });
  }, []);
  return (
    <div>
      <PageHeader title="通过名单"></PageHeader>
      <div className={styles.wrapper}>
        <Table
          columns={columns}
          pagination={{
            className: styles.pagination,
          }}
          // loading={loading}
          onRow={record => ({
            onClick: () =>
              history.push(`/young-push/history/${record.step.slice(1, 2)}`),
          })}
          dataSource={list.map((i, index) => ({
            ...i,
            step: `第${i.step}轮推送名单`,
            key: index,
          }))}
        />
      </div>
    </div>
  );
};

export default YoungPushHistory;
