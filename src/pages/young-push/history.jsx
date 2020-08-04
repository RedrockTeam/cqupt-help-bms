import React from 'react'
import { connect, ConnectRC, Loading } from 'umi'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import styles from './index.css'

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '学号', dataIndex: 'stu_num', key: 'stu_num' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
]


const list = [
  {
    id: 1,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 2,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 3,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 4,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 5,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 6,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 7,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
]

const YoungPushHistory = () => {
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
          // loading={loading}
          dataSource={list.map(i => ({ ...i, key: i.id }))}
        />
      </div>
    </div>
  )
}

export default YoungPushHistory
