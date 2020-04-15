import React from 'react'
import { Link, connect, ConnectProps } from 'umi'
import { Table } from 'antd'
import styles from './user.css'
import PageHeader from '@/components/pageHeader'
import PageHeaderBtn from '@/components/pageHeaderBtn'
import sharedStyles from '@/assets/styles.css'
import { UserModelState } from '@/models/user'

const columns = [
  { title: '活动任务', dataIndex: 'title', key: 'title' },
  { title: '发布时间', dataIndex: 'updated_time', key: 'updated_time' },
]

type ConnectState = {
  user: UserModelState,
}

type Props = ConnectState & ConnectProps

const User = ({ user }: Props) => {
  return (
    <div>
      <PageHeader title="我的任务">
        <PageHeaderBtn type="history">
          <Link to="/user/history" className={sharedStyles.pageHeaderBtn}>历史任务</Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender(record) {
            return <p className={styles.description}>{record.content}</p>
          },
          expandIconColumnIndex: 2,
        }}
        dataSource={user.tasks.map(task => ({ ...task, key: task.id }))}
        scroll={{
          y: '76vh',
        }}
        expandRowByClick
      />
    </div>
  )
}

export default connect((state: ConnectState) => ({
  user: state.user,
}))(User)
