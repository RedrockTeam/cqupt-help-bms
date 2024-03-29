import React from 'react';
import { Link, connect, ConnectRC, Loading } from 'umi';
import { Table } from 'antd';
import PageHeader from '@/components/pageHeader';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import sharedStyles from '@/assets/styles.css';
import styles from './ticket.css';
import { TicketModelState } from '@/models/ticket';
import moment from 'moment';

const columns = [
  { title: '电影名称', dataIndex: 'name', key: 'name' },
  { title: '创建人', dataIndex: 'username', key: 'username' },
  { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
];

type PageProps = {
  ticket: TicketModelState;
  loading: boolean;
};

const Ticket: ConnectRC<PageProps> = ({ ticket, history, loading }) => {
  return (
    <div>
      <PageHeader title="影票上线管理中心">
        <PageHeaderBtn type="add">
          <Link to="/ticket/add" className={sharedStyles.pageHeaderBtn}>
            新增影票
          </Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        columns={columns}
        pagination={false}
        dataSource={ticket.tickets.map(ticket => ({
          ...ticket,
          created_at: moment
            .unix(ticket.created_at)
            .format('YYYY-MM-DD hh:mm:ss'),
          key: ticket.id,
        }))}
        scroll={{
          y: '76vh',
        }}
        rowClassName={styles.tableRow}
        loading={loading}
        onRow={record => ({
          onClick: () => history.push(`/ticket/${record.id}`),
        })}
      />
    </div>
  );
};

export default connect(
  ({ ticket, loading }: { ticket: TicketModelState; loading: Loading }) => ({
    ticket,
    loading: loading.effects['ticket/fetchTickets']!,
  }),
)(Ticket);
