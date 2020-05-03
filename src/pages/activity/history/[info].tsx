import React from 'react'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import { connect, useLocation, ConnectRC, Loading } from 'umi';
import { ActivityModelState } from '@/models/activity'
import { parse } from 'query-string';

const columns = [
  { title: '获奖人', dataIndex: 'username', key: 'username' },
  { title: '学号', dataIndex: 'stuNum', key: 'stuNum' },
  { title: '奖品', dataIndex: 'name', key: 'name' },
  { title: '奖项', dataIndex: 'level', key: 'level' },
]

interface Person {
  name: string,
  level: number,
  username: string,
  stuNum: string,
  key: string,
}

type PageProps = {
  activity: ActivityModelState,
  loading: boolean,
}

const Info: ConnectRC<PageProps> = ({ activity, loading }) => {
  const { title } = parse(useLocation().search)

  return (
    <div>
      <PageHeader title={title as string} />
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
        loading={loading}
        scroll={{
          y: '76vh',
        }}
      />
    </div>
  )
}

export default connect(({ activity, loading }: { activity: ActivityModelState, loading: Loading }) => ({
  activity,
  loading: loading.models.activity,
}))(Info)
