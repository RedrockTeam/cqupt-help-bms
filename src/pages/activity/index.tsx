import React, { useState, useCallback } from 'react'
import { Link, useHistory } from 'umi'
import { Table, Modal, Button, Form, DatePicker, Input } from 'antd'
import PageHeader from '@/components/pageHeader'
import styles from './activity.css'
import PageHeaderBtn from '@/components/pageHeaderBtn'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const originData = [
  {
    key: 1,
    activity: '活动上线设置',
    creator: '重小邮',
    time: '2020/01/02',
  },
  {
    key: 2,
    activity: '双十一寻找锦鲤活动抽奖',
    creator: '重小邮',
    time: '2020/01/02',
  },
  {
    key: 3,
    activity: '国庆献礼三大活动获奖名单',
    creator: '重小邮',
    time: '2020/01/02',
  },
]

const Activity = () => {
  const history = useHistory()
  const [data, setData] = useState(originData)
  const [visible, setVisible] = useState<boolean>(false)

  const closeModal = useCallback(() => setVisible(false), [])
  const submitModal = useCallback(() => {
    closeModal()
  }, [closeModal])
  const onFinish = (values: any) => {
    setData(data => [...data, {
      key: values.activityName,
      time: new Date().toLocaleDateString(),
      activity: values.activityName,
      creator: 'ahabhgk',
    }])
    closeModal()
  }
  const deleteActivity = (record: any) => {
    Modal.confirm({
      title: '确认删除这个活动吗？',
      icon: <ExclamationCircleOutlined />,
      // content: '',
      onOk() {
        setData(data.filter((item) => record.activity !== item.activity))
      },
    })
  }

  return (
    <div>
      <PageHeader title="活动奖品推送中心">
        <PageHeaderBtn type="add" onClick={() => setVisible(true)}>
          <span className={styles.pageHeaderBtn}>新建活动</span>
        </PageHeaderBtn>
        <PageHeaderBtn type="history">
          <Link to="/activity/history" className={styles.pageHeaderBtn}>历史记录</Link>
        </PageHeaderBtn>
      </PageHeader>
      <Table
        pagination={false}
        dataSource={data}
        scroll={{
          y: '76vh',
        }}
        onRow={record => ({
          onClick: () => history.push(`/activity/${record.activity}`),
        })}
      >
        <Table.Column title="活动名称" dataIndex="activity" key="activity" />
        <Table.Column title="创建人" dataIndex="creator" key="creator" />
        <Table.Column title="创建时间" dataIndex="time" key="time" />
        <Table.Column title="操作" key="operate" render={(record) => (
          <div>
            <Link to={`/activity/${record.activity}/update`} onClick={(e) => e.stopPropagation()}><span className={styles.update}>修改</span></Link>
            <span onClick={() => deleteActivity(record)} className={styles.delete}>删除</span>
          </div>
        )} />
      </Table>
      <Modal
        title="新建活动申请"
        visible={visible}
        centered
        onOk={submitModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form name="modal-form" onFinish={onFinish} layout="vertical">
          <Form.Item name="activityName" label="活动名称" rules={[{ required: true, message: '请填写活动名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="endDate" label="下线时间" rules={[{ required: true, message: '请选择时间' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitBtn}>
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Activity
