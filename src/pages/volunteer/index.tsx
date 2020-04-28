import React from 'react'
import { Link, connect, ConnectProps } from 'umi'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import PageHeaderBtn from '@/components/pageHeaderBtn'
import sharedStyles from '@/assets/styles.css'
import { VolunteerModelState } from '@/models/volunteer'

const columns = [
  { title: '活动名称', dataIndex: 'name', key: 'name' },
  { title: '创建人', dataIndex: 'username', key: 'username' },
]

type ConnectState = {
  volunteer: VolunteerModelState,
}

type Props = ConnectState & ConnectProps

const Volunteer = ({ volunteer, history }: Props) => {
  return (
    <div>
      <PageHeader title="志愿服务管理">
        <PageHeaderBtn type="add">
          <Link to="/volunteer/add" className={sharedStyles.pageHeaderBtn}>新建活动</Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        columns={columns}
        pagination={false}
        dataSource={volunteer.volunteerActivities.map(ac => ({ ...ac, key: ac.id }))}
        scroll={{
          y: '76vh',
        }}
        onRow={record => ({
          onClick: () => history.push(`/volunteer/${record.id}`),
        })}
      />
    </div>
  )
}

export default connect((state: ConnectState) => ({
  volunteer: state.volunteer,
}))(Volunteer)
