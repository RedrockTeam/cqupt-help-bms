import React, { useState, useEffect } from 'react'
import { Link, connect, Loading, ConnectRC } from 'umi'
import { Table, Button, Checkbox } from 'antd'
import PageHeader from '@/components/pageHeader'
import PageHeaderBtn from '@/components/pageHeaderBtn'
import sharedStyles from '@/assets/styles.css'
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
  {
    id: 8,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 9,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 10,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id:11,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 12,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 13,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
  {
    id: 14,
    name: '刘静猪猪',
    stu_num: '2018214139',
    phone: '13060229931',
  },
]

const YoungPush = () => {
  const [selectedIds, setSelectedIds] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  useEffect(() => {
    if (selectedIds.length === list.length) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [selectedIds.length])
  const selectAll = () => {
    if (isChecked) {
      setSelectedIds([])
    } else {
      setSelectedIds(list.map(e => e.id))
    }
  }
  return (
    <div>
      <PageHeader title="推送信息TODO">
        <PageHeaderBtn type="history">
          <Link to="/young-push/history" className={sharedStyles.pageHeaderBtn}>已推送名单</Link>
        </PageHeaderBtn>
      </PageHeader>
      <div className={styles.wrapper}>
        <Table
          rowSelection={{
            selectedRowKeys: selectedIds,
            onChange(keys) {
              setSelectedIds(keys)
            },
          }}
          pagination={{
            className: styles.pagination
          }}
          columns={columns}
          // loading={loading}
          dataSource={list.map(i => ({ ...i, key: i.id }))}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
            position: 'relative',
          }}
        >
          <Checkbox
            style={{
              position: 'absolute',
              top: '-40px',
              left: '24px',
            }}
            onChange={selectAll}
            checked={isChecked}
          ><span style={{ marginLeft: '29px' }}>所有页面全选</span></Checkbox>
          <Button
            type="primary"
            onClick={() => {
              if (selectedIds.length) {
                //
              }
            }}
            className={sharedStyles.okButton}
          >发送推送</Button>
        </div>
      </div>
    </div>
  )
}

export default YoungPush
