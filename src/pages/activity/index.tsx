import React, { useState, useCallback } from 'react'
import { Link, useHistory, connect, ConnectProps } from 'umi'
import { Table, Modal, Button, Form, DatePicker, Input } from 'antd'
import PageHeader from '@/components/pageHeader'
import styles from './activity.css'
import sharedStyles from '@/assets/styles.css'
import PageHeaderBtn from '@/components/pageHeaderBtn'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ActivityModelState } from '@/models/activity'

type ConnectState = {
  activity: ActivityModelState,
}

type Props = ConnectState & ConnectProps

const Activity = ({ activity }: Props) => {
  const history = useHistory()
  const [visible, setVisible] = useState<boolean>(false)

  const closeModal = useCallback(() => setVisible(false), [])
  const submit = (values: any) => {
    // TODO
    closeModal()
  }
  const deleteActivity = (record: any) => {
    Modal.confirm({
      title: '确认删除这个活动吗？',
      icon: <ExclamationCircleOutlined />,
      // content: '',
      onOk() {
        // TODO
      },
    })
  }

  return (
    <div>
      <PageHeader title="活动奖品推送中心">
        <PageHeaderBtn type="add" onClick={() => setVisible(true)}>
          <span className={sharedStyles.pageHeaderBtn}>新建活动</span>
        </PageHeaderBtn>
        <PageHeaderBtn type="history">
          <Link to="/activity/history" className={sharedStyles.pageHeaderBtn}>历史记录</Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        pagination={false}
        dataSource={activity.activityInfos.map(a => ({ ...a, key: a.id }))}
        scroll={{
          y: '76vh',
        }}
        onRow={record => ({
          onClick: () => history.push(`/activity/${record.name}`),
        })}
      >
        <Table.Column title="活动名称" dataIndex="name" key="name" />
        <Table.Column title="创建人" dataIndex="username" key="username" />
        <Table.Column title="创建时间" dataIndex="create_time" key="create_time" />
        <Table.Column title="操作" key="operate" render={(record) => (
          <div>
            <Link
              to={`/activity/${record.name}/update`}
              onClick={(e) => e.stopPropagation()}
            ><span className={styles.update}>修改</span></Link>
            <span
              onClick={(e) => {
                e.stopPropagation()
                deleteActivity(record)
              }}
              className={styles.delete}
            >删除</span>
          </div>
        )} />
      </Table>
      <Modal
        title="新建活动申请"
        visible={visible}
        centered
        onCancel={closeModal}
        footer={null}
      >
        <Form name="modal-form" onFinish={submit} layout="vertical">
          <Form.Item name="activityName" label="活动名称" rules={[{ required: true, message: '请填写活动名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="endDate" label="下线时间" rules={[{ required: true, message: '请选择时间' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={sharedStyles.okButton}>
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default connect((state: ConnectState) => ({
  activity: state.activity,
}))(Activity)
