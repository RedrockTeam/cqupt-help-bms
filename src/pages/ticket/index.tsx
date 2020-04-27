import React from 'react'
import { Link, connect, ConnectProps } from 'umi'
import { Table } from 'antd'
import PageHeader from '@/components/pageHeader'
import PageHeaderBtn from '@/components/pageHeaderBtn'
import sharedStyles from '@/assets/styles.css'
import { TicketModelState } from '@/models/ticket'

const columns = [
  { title: '电影名称', dataIndex: 'name', key: 'name' },
  { title: '创建人', dataIndex: 'username', key: 'username' },
]

type ConnectState = {
  ticket: TicketModelState,
}

type Props = ConnectState & ConnectProps

const Ticket = ({ ticket, history }: Props) => {
  return (
    <div>
      <PageHeader title="影票上线管理中心">
        <PageHeaderBtn type="add">
          <Link to="/ticket/add" className={sharedStyles.pageHeaderBtn}>新增影票</Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        columns={columns}
        pagination={false}
        dataSource={ticket.tickets.map(ticket => ({ ...ticket, key: ticket.id }))}
        scroll={{
          y: '76vh',
        }}
        onRow={record => ({
          onClick: () => history.push(`/ticket/${record.id}`),
        })}
      />
    </div>
  )
}

export default connect((state: ConnectState) => ({
  ticket: state.ticket,
}))(Ticket)
