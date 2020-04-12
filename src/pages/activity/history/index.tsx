import React from 'react'
import { Table } from 'antd'
import PageHeader from '../../../components/pageHeader'
import { useHistory } from 'umi';

const columns = [
  { title: '活动名称', dataIndex: 'activity', key: 'activity' },
  { title: '创建人', dataIndex: 'creator', key: 'creator' },
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
  const history = useHistory()
  return (
    <div>
      <PageHeader title="历史推送" />
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        scroll={{
          y: '76vh',
        }}
        onRow={record => ({
          onClick: event => history.push(`/activity/history/info?name=${record.activity}`),
        })}
      />
    </div>
  )
}
