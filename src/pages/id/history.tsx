import React from 'react'
import { connect, ConnectProps, IdModuleState } from 'umi'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import { IdInfo } from '@/interfaces/id'
import styles from './id.css'

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
]

type ConnectState = {
  id: IdModuleState,
}

type Props = ConnectState & ConnectProps

const IdHistory = ({ id }: Props) => {
  return (
    <div>
      <PageHeader title="通过名单">
      </PageHeader>
      <div className={styles.wrapper}>
        <Table
          columns={columns}
          pagination={{
            className: styles.pagination
          }}
          dataSource={id.passList.map(i => ({ ...i, key: i.id }))}
        />
      </div>
    </div>
  )
}

export default connect((state: ConnectState) => ({
  id: state.id,
}))(IdHistory)
