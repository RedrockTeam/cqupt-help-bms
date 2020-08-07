import React from 'react';
import { Link, connect, ConnectRC, Loading } from 'umi';
import { Table } from 'antd';
import PageHeader from '@/components/pageHeader';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import sharedStyles from '@/assets/styles.css';
import { VolunteerModelState } from '@/models/volunteer';

const columns = [
  { title: '活动名称', dataIndex: 'name', key: 'name' },
  { title: '创建人', dataIndex: 'username', key: 'username' },
];

type PageProps = {
  volunteer: VolunteerModelState;
  loading: boolean;
};

const Volunteer: ConnectRC<PageProps> = ({ volunteer, history, loading }) => {
  return (
    <div>
      <PageHeader title="志愿服务管理">
        <PageHeaderBtn type="add">
          <Link to="/volunteer/add" className={sharedStyles.pageHeaderBtn}>
            新建活动
          </Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        columns={columns}
        pagination={false}
        dataSource={volunteer.volunteerActivities.map(ac => ({
          ...ac,
          key: ac.id,
        }))}
        scroll={{
          y: '76vh',
        }}
        loading={loading}
        onRow={record => ({
          onClick: () => history.push(`/volunteer/${record.id}`),
        })}
      />
    </div>
  );
};

export default connect(
  ({
    volunteer,
    loading,
  }: {
    volunteer: VolunteerModelState;
    loading: Loading;
  }) => ({
    volunteer,
    loading: loading.effects['volunteer/fetchVolunteerActivities']!,
  }),
)(Volunteer);
