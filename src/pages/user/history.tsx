import React from 'react'
import { connect, ConnectProps } from 'umi'
import { Table } from 'antd'
import { UserModelState } from '@/models/user'
import PageHeader from '@/components/pageHeader'

const columns = [
  { title: '活动任务', dataIndex: 'detail', key: 'detail' },
  { title: '发布时间', dataIndex: 'created_at', key: 'created_at' },
]

type ConnectState = {
  user: UserModelState,
}

type Props = ConnectProps & ConnectState

const UserHistory = ({ user }: Props) => {
  return (
    <div>
      <PageHeader title="历史任务" />
      <Table
        columns={columns}
        pagination={false}
        dataSource={user.histories.map(h => ({ ...h, key: h.id }))}
        scroll={{
          y: '76vh',
        }}
      />
    </div>
  )
}

export default connect((state: ConnectState) => ({
  user: state.user,
}))(UserHistory)
