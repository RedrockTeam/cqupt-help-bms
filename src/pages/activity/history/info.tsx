import React from 'react'
import { Table } from 'antd'
import PageHeader from '../../../components/pageHeader'
import { useParams, useRouteMatch, useLocation } from 'umi';

const columns = [
  { title: '活动任务', dataIndex: 'job', key: 'job' },
  { title: '发布时间', dataIndex: 'time', key: 'time' },
];

const data = [
  {
    key: 1,
    job: '活动上线设置',
    time: '2020/01/02',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    job: '活动获奖推送编辑',
    time: '2020/01/02',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 3,
    job: '影票发布',
    time: '2020/01/02',
    description: '将上线内容提前发布至重邮帮后台系统，同时准备奖品内容的推送，为后序用户领奖做准备。将上线内容提前发布至重邮帮后台系统，同时准备奖品内容的推送，为后序用户领奖做准备。将上线前发布至重邮帮后台系统，同时准备奖品内容的推送，为后序用户领奖做准备。将上线内容提前发布至重邮帮后台系统，同时准备奖品内容的推送，为后序用户领奖做准备。将上线。',
  },
]

export default () => {
  const location = useLocation()
console.log(location)
  return (
    <div>
      <PageHeader title={(location as any).query.name} />
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
