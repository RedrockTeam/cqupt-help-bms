import React from 'react'
import { connect, ConnectProps } from 'umi'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import { VolunteerModelState } from '@/models/volunteer'
import { VolunteerActivityUserInfo } from '@/interfaces/volunteer'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: VolunteerActivityUserInfo, b: VolunteerActivityUserInfo) => a.name.localeCompare(b.name),
  },
  { title: '学号', dataIndex: 'stu_num', key: 'stu_num' },
  {
    title: '学院',
    dataIndex: 'college',
    key: 'college',
    sorter: (a: VolunteerActivityUserInfo, b: VolunteerActivityUserInfo) => a.college.localeCompare(b.college),
  },
  { title: '身份证号', dataIndex: 'person_num', key: 'person_num' },
  { title: '电话号码', dataIndex: 'phone', key: 'phone' },
  {
    title: '志愿时段',
    dataIndex: 'time_part',
    key: 'time_part',
    sorter: (a: VolunteerActivityUserInfo, b: VolunteerActivityUserInfo) => a.time_part.localeCompare(b.time_part),
  },
]

type ConnectState = {
  volunteer: VolunteerModelState,
}

type Props = ConnectState & ConnectProps

const VolunteerUserHistory = ({ volunteer }: Props) => {
  return (
    <div>
      <PageHeader title="通过名单">
      </PageHeader>
      <div style={{ backgroundColor: '#ffffff' }}>
        <Table
          columns={columns}
          pagination={{
            style: { float: 'right', margin: 20 },
          }}
          dataSource={volunteer.volunteerActivityHistoryUserInfos.map(i => ({ ...i, key: i.id }))}
        />
      </div>
    </div>
  )
}

export default connect((state: ConnectState) => ({
  volunteer: state.volunteer,
}))(VolunteerUserHistory)
