import React, { useState, useEffect } from 'react'
import { connect, ConnectRC, Loading, request, useParams } from 'umi'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import styles from '../index.css'

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '学号', dataIndex: 'stu_num', key: 'stu_num' },
  { title: '电话号码', dataIndex: 'phone', key: 'phone' },
]

const YoungPushHistoryInfo = () => {
  const { info } = useParams()
  const id = parseInt(info, 10)
  const [list, setList] = useState([])
  useEffect(() => {
    request('/team/apply/step/info', {
      method: 'POST',
      body: JSON.stringify({ step: id })
    }).then(res => {
      if (res.status === 10000) {
        setList(res.data)
      }
    })
  }, [id])
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
          dataSource={list.map((i, index) => ({ ...i, step: `第${i.step}轮推送名单`, key: index }))}
        />
      </div>
    </div>
  )
}

export default YoungPushHistoryInfo
