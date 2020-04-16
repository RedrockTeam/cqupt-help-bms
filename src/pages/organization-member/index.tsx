import React, { useState, useEffect } from 'react'
import { connect, ConnectProps } from 'umi'
import { OrganizationModelState } from '@/models/organization'
import PageHeader from '@/components/pageHeader'
import Member from '@/components/organizationMember'
import OrganizationPerson from '@/components/organizationPerson'
import StyleSheet from '@/assets/styles.css'
import { Modal, Input, Button, Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

type ConnectState = {
  organization: OrganizationModelState,
}

type Props = ConnectProps & ConnectState

const OrganizationMenber = ({ organization, dispatch }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [jobId, setJobId] = useState<number>()

  const submit = (values: any) => {
    dispatch!({
      type: 'organization/addMember',
      payload: {
        stuNum: values.stu_num,
        job_id: jobId,
      }
    })
    close()
  }
  const close = () => setVisible(false)

  useEffect(() => {
    setJobId(organization.members[1]?.job.job_id)
  }, [organization.members])

  return (
    <div>
      <PageHeader title="部门成员" />
      <div className={StyleSheet.wrapper}>
        {organization.members.map((group, index) =>
          <Member key={group.job.job_id} title={group.job.job_name}>
            {group.TeamPersons.map(person =>
              <OrganizationPerson
                onClick={() => Modal.confirm({
                  title: 'Do you want to delete these items?',
                  icon: <ExclamationCircleOutlined />,
                  content: 'When clicked the OK button, this dialog will be closed after 1 second',
                  onOk: () => dispatch!({
                    type: 'organization/deleteMember',
                    payload: {
                      id: person.id, // TODO: 等后端改成 stuNum
                      job_id: group.job.job_id,
                    },
                  }),
                })}
                key={person.id}
                person={person}
              />)}
              {index !== 0 && <OrganizationPerson
                onClick={() => setVisible(true)}
                key={'add'}
              />}
          </Member>
        )}
      </div>

      <Modal
        title="添加成员"
        visible={visible}
        centered
        onCancel={close}
        footer={null}
      >
        <Form name="modal-form" onFinish={submit} layout="vertical">
          <Form.Item name="stu_num" label="成员学号" rules={[{ required: true, message: '请填写学号' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default connect((state: ConnectState) => ({
  organization: state.organization,
}))(OrganizationMenber)
