import React from 'react'
import { Link } from 'umi'
import { Table } from 'antd'
import {
  ClockCircleOutlined,
} from '@ant-design/icons'
import PageHeader from '../../components/pageHeader'
import styles from './activity.css'
import PageHeaderBtn from '@/components/pageHeaderBtn'

const columns = [
  { title: '活动名称', dataIndex: 'activity', key: 'activity' },
  { title: '创建人', dataIndex: 'creator', key: 'creator' },
  { title: '创建时间', dataIndex: 'time', key: 'time' },
  {
    title: '操作',
    key: 'operate',
    render: () => (
      <div>
        <Link to="/activity/update"><span className={styles.update}>修改</span></Link>
        <span className={styles.delete}>删除</span>
      </div>
    )
  },
];

const data = [
  {
    key: 1,
    activity: '活动上线设置',
    creator: '重小邮',
    time: '2020/01/02',
  },
  {
    key: 2,
    activity: '双十一寻找锦鲤活动抽奖',
    creator: '重小邮',
    time: '2020/01/02',
  },
  {
    key: 3,
    activity: '国庆献礼三大活动获奖名单',
    creator: '重小邮',
    time: '2020/01/02',
  },
]

export default () => {
  return (
    <div>
      <PageHeader title="活动奖品推送中心">
        <PageHeaderBtn type="add" onClick={() => console.log('hah')}>新建活动</PageHeaderBtn>
        <Link to="/activity/history">
          <PageHeaderBtn type="history">历史记录</PageHeaderBtn>
        </Link>
      </PageHeader>
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        scroll={{
          y: '76vh',
        }}
      />
    </div>
  )
}
