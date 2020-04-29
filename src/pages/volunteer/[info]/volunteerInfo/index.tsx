import React, { useState } from 'react'
import { Link, connect, ConnectProps, useParams } from 'umi'
import { Table, Button, Modal, Form, Input, DatePicker } from 'antd'
import PageHeader from '@/components/pageHeader'
import PageHeaderBtn from '@/components/pageHeaderBtn'
import sharedStyles from '@/assets/styles.css'
import { VolunteerModelState, createPushVolunteerUsers } from '@/models/volunteer'
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

const VolunteerInfo = ({ volunteer, dispatch }: Props) => {
  const { info } = useParams()
  const id = parseInt(info!, 10)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div>
      <PageHeader title="护花使者">
        <PageHeaderBtn type="history">
          <Link to={`/volunteer/${id}/volunteerInfo/history`} className={sharedStyles.pageHeaderBtn}>通过名单</Link>
        </PageHeaderBtn>
      </PageHeader>
      <div style={{ backgroundColor: '#ffffff' }}>
        <Table
          rowSelection={{
            selectedRowKeys: selectedIds,
            onChange(keys) {
              setSelectedIds(keys as number[])
            },
          }}
          pagination={{
            style: { float: 'right', margin: 20 },
          }}
          columns={columns}
          dataSource={volunteer.volunteerActivityUserInfos.map(i => ({ ...i, key: i.id }))}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              if (selectedIds.length) {
                setVisible(true)
              }
            }}
            className={sharedStyles.okButton}
          >发送推送</Button>
        </div>
      </div>

      <Modal
        title="添加成员"
        visible={visible}
        centered
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          name="modal-form"
          onFinish={(values) => {
            dispatch!(createPushVolunteerUsers(id, selectedIds, values.qq_num, values.down_date.unix()))
            setVisible(false)
          }}
          layout="vertical"
        >
          <Form.Item
            name="qq_num"
            label="QQ 群号"
            rules={[{ required: true, message: '请填写 QQ 群号' }]}
          >
            <Input type="number" className={sharedStyles.inputBorder} />
          </Form.Item>
          <Form.Item
            name="down_date"
            label="下线时间"
            rules={[{ required: true, message: '请填写志愿活动下线实现' }]}
          >
            <DatePicker showTime className={sharedStyles.inputBorder} />
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
  volunteer: state.volunteer,
}))(VolunteerInfo)
