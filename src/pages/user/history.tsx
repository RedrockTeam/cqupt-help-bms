import React from 'react'
import { connect, Loading, ConnectRC } from 'umi'
import { Table } from 'antd'
import { UserModelState } from '@/models/user'
import PageHeader from '@/components/pageHeader'

const columns = [
  { title: '活动任务', dataIndex: 'detail', key: 'detail' },
  { title: '发布时间', dataIndex: 'created_at', key: 'created_at' },
]

type PageProps = {
  user: UserModelState,
  loading: boolean,
}

const UserHistory: ConnectRC<PageProps> = ({ user, loading }) => {
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
        loading={loading}
      />
    </div>
  )
}

export default connect(({ user, loading }: { user: UserModelState, loading: Loading }) => ({
  user,
  loading: loading.effects['user/fetchUserHistories']!,
}))(UserHistory)
