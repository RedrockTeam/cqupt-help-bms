import React, { useState } from 'react';
import { Link, connect, Loading, ConnectRC } from 'umi';
import { Table, Button } from 'antd';
import PageHeader from '@/components/pageHeader';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import sharedStyles from '@/assets/styles.css';
import styles from './id.css';
import { IdInfo } from '@/interfaces/id';
import { createPassIdApply, IdModelState } from '@/models/id';

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

interface PageProps {
  id: IdModelState;
  loading: boolean;
}

const Id: ConnectRC<PageProps> = ({ id, dispatch, loading }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  return (
    <div>
      <PageHeader title="身份有证管理中心">
        <PageHeaderBtn type="history">
          <Link to="/id/history" className={sharedStyles.pageHeaderBtn}>
            通过名单
          </Link>
        </PageHeaderBtn>
      </PageHeader>
      <div className={styles.wrapper}>
        <Table
          rowSelection={{
            selectedRowKeys: selectedIds,
            onChange(keys) {
              setSelectedIds(keys as number[]);
            },
          }}
          pagination={{
            className: styles.pagination,
          }}
          columns={columns}
          loading={loading}
          dataSource={id.applyList.map(i => ({ ...i, key: i.id }))}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              if (selectedIds.length) {
                dispatch!(createPassIdApply(selectedIds));
              }
            }}
            className={sharedStyles.okButton}
          >
            生成证件
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ id, loading }: { id: IdModelState; loading: Loading }) => ({
    id,
    loading: loading.effects['id/fetchApplyingIdInfos']!,
  }),
)(Id);
