import React from 'react'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import { useHistory, connect, ConnectProps } from 'umi';
import { ActivityModelState } from '@/models/activity'

const columns = [
  { title: '活动名称', dataIndex: 'name', key: 'name' },
  { title: '创建人', dataIndex: 'username', key: 'username' },
];

type ConnectState = {
  activity: ActivityModelState,
}

type Props = ConnectState & ConnectProps

const ActivityHistory = ({ activity }: Props) => {
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
        onRow={record => ({
          onClick: event => history.push(`/activity/history/${record.name}?id=${record.id}`),
        })}
      />
    </div>
  )
}

export default connect((state: ConnectState) => ({
  activity: state.activity,
}))(ActivityHistory)
