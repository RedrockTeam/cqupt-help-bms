import React from 'react';
import { Table } from 'antd';
import { useLocation, Link, connect, ConnectRC, Loading, useParams } from 'umi';
import PageHeader from '@/components/pageHeader';
import PageHeaderBtn from '@/components/pageHeaderBtn';
import sharedStyles from '@/assets/styles.css';
import { ActivityModelState } from '@/models/activity';
import { parse } from 'query-string';
import { redirectTo } from '@/utils';

const columns = [
  { title: '获奖人', dataIndex: 'username', key: 'username' },
  { title: '学号', dataIndex: 'stuNum', key: 'stuNum' },
  { title: '奖品', dataIndex: 'name', key: 'name' },
  { title: '奖项', dataIndex: 'level', key: 'level' },
];

interface Person {
  name: string;
  level: string;
  username: string;
  stuNum: string;
  key: string;
}

type PageProps = {
  activity: ActivityModelState;
  loading: boolean;
};

const Info: ConnectRC<PageProps> = ({ activity, loading }) => {
  const location = useLocation();
  const params: any = useParams()
  const { title } = parse(location.search);
  console.log(location);

  if (!loading && activity.activityGifts.length === 0) {
    redirectTo(`/activity/${params.info}/update?title=${title}`)
  }
  return (
    <div>
      <PageHeader title={title as string}>
        <PageHeaderBtn>
          <Link
            to={`${location.pathname}/update?title=${title}`}
            className={sharedStyles.pageHeaderBtn}
            style={{ color: '#36CA94' }}
          >
            修改
          </Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        columns={columns}
        pagination={false}
        dataSource={activity.activityGifts.reduce((acc: Person[], cur) => {
          const res = cur.stu_nums.map((num, i) => ({
            name: cur.name,
            level: cur.level,
            username: cur.names[i],
            stuNum: num,
            // key: num,
            key: num + cur.names[i],
          }));
          return [...acc, ...res];
        }, [])}
        loading={loading}
        scroll={{
          y: '76vh',
        }}
      />
    </div>
  );
};

export default connect(
  ({
    activity,
    loading,
  }: {
    activity: ActivityModelState;
    loading: Loading;
  }) => ({
    activity,
    loading: loading.effects['activity/fetchActivityGifts']!,
  }),
)(Info);
