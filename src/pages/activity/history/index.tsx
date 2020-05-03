import React from 'react'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import { useHistory, connect, ConnectRC, Loading } from 'umi';
import { ActivityModelState } from '@/models/activity'

const columns = [
  { title: '活动名称', dataIndex: 'name', key: 'name' },
  { title: '创建人', dataIndex: 'username', key: 'username' },
];

type PageProps = {
  activity: ActivityModelState,
  loading: boolean,
}

const ActivityHistory: ConnectRC<PageProps> = ({ activity, loading }) => {
  const history = useHistory()
  return (
    <div>
      <PageHeader title="历史推送" />
      <Table
        columns={columns}
        pagination={false}
        dataSource={activity.activityHistoryInfos.map(a => ({ ...a, key: a.id }))}
        scroll={{
          y: '76vh',
        }}
        loading={loading}
        onRow={record => ({
          onClick: event => history.push(`/activity/history/${record.id}?title=${record.name}`),
        })}
      />
    </div>
  )
}

export default connect(({ activity, loading }: { activity: ActivityModelState, loading: Loading }) => ({
  activity,
  loading: loading.models.activity,
}))(ActivityHistory)
