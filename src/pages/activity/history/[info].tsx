import React from 'react'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import { useParams, connect, ConnectProps } from 'umi';
import { ActivityModelState } from '@/models/activity'

const columns = [
  { title: '获奖人', dataIndex: 'username', key: 'username' },
  { title: '学号', dataIndex: 'stuNum', key: 'stuNum' },
  { title: '奖品', dataIndex: 'name', key: 'name' },
  { title: '奖项', dataIndex: 'level', key: 'level' },
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

interface Person {
  name: string,
  level: number,
  username: string,
  stuNum: string,
  key: string,
}

type ConnectState = {
  activity: ActivityModelState,
}

type Props = ConnectState & ConnectProps

const Info = ({ activity }: Props) => {
  const params = useParams<{ info: string }>()

  return (
    <div>
      <PageHeader title={params.info} />
      <Table
        columns={columns}
        pagination={false}
        dataSource={activity.activityHistoryGifts.reduce((acc: Person[], cur) => {
          const res = cur.infos.map(info => ({
            name: cur.name,
            level: cur.level,
            username: info.name,
            stuNum: info.stu_num,
            key: info.stu_num + cur.name
          }))
          return [...acc, ...res]
        }, [])}
        scroll={{
          y: '76vh',
        }}
      />
    </div>
  )
}

export default connect((state: ConnectState) => ({
  activity: state.activity,
}))(Info)
