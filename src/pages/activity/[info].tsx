import React from 'react'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import { useParams, useRouteMatch, useLocation, Link } from 'umi';
import PageHeaderBtn from '@/components/pageHeaderBtn';

const columns = [
  { title: '获奖人', dataIndex: 'winner', key: 'winner' },
  { title: '学号', dataIndex: 'schoolId', key: 'schoolId' },
  { title: '奖品', dataIndex: 'prize', key: 'prize' },
  { title: '奖项', dataIndex: 'awards', key: 'awards' },
];

const data = [
  {
    key: 1,
    winner: '刘静',
    schoolId: '2018214139',
    prize: '零食大礼包',
    awards: '一等奖',
  },
  {
    key: 2,
    winner: '刘小静',
    schoolId: '2018214139',
    prize: '零食小礼包',
    awards: '二等奖',
  },
  {
    key: 3,
    winner: '刘静静',
    schoolId: '2018214139',
    prize: '猪猪',
    awards: '特等奖',
  },
]

const Info = () => {
  const title = useLocation().pathname.split('/').filter(i => i).pop()

  return (
    <div>
      <PageHeader title={title!}>
        <Link to={`/activity/${title}/update`}>
          <PageHeaderBtn>修改</PageHeaderBtn>
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

export default Info
