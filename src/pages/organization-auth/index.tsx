import React, { useState, useEffect, Fragment } from 'react'
import { connect, ConnectProps } from 'umi'
import { OrganizationModelState } from '@/models/organization'
import PageHeader from '@/components/pageHeader'
import Member from '@/components/organizationMember'
import OrganizationPerson from '@/components/organizationPerson'
import StyleSheet from '@/assets/styles.css'
import { Modal, Button, Form, Radio } from 'antd'
import { TeamPersons } from '@/interfaces/organization'

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

type ConnectState = {
  organization: OrganizationModelState,
}

type Props = ConnectProps & ConnectState

// 先把添加成员的逻辑注释了，防止产品 🦐🐔8 改
const OrganizationAuth = ({ organization, dispatch }: Props) => {
  // const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false)
  const [jobId, setJobId] = useState<number>()
  const [originUserId, setOriginUserId] = useState<number>()

  // TODO: fix type
  const submitUpdate = (values: any) => {
    dispatch!({
      type: 'organization/updateAuth',
      payload: {
        job_id: jobId,
        user_id: values.authValue,
        origin_user_id: originUserId,
      }
    })
    closeUpdateModal()
  }
  const openUpdateModal = (jobId: number, originUserId: number) => {
    dispatch!({
      type: 'organization/fetchCanAuthList',
      payload: { job_id: jobId },
    })
    setJobId(jobId)
    setOriginUserId(originUserId)
    setUpdateModalVisible(true)
  }
  const closeUpdateModal = () => setUpdateModalVisible(false)

  // const submit = (values: any) => {
  //   dispatch!({
  //     type: 'organization/addMember',
  //     payload: {
  //       stuNum: values.stu_num,
  //       job_id: jobId,
  //     }
  //   })
  //   close()
  // }
  // const close = () => setAddModalVisible(false)

  // useEffect(() => {
  //   setJobId(organization.members[1]?.job.job_id)
  // }, [organization.members])

  return (
    <div>
      <PageHeader title="权限管理" />
      <div className={StyleSheet.wrapper}>
        {organization.auths.map((group, index) =>
          <Member key={group.job.job_id} title={group.job.job_name}>
            {group.TeamPersons.map(person => (
              <OrganizationPerson
                key={person.id}
                onClick={() => openUpdateModal(group.job.job_id, person.id)}
                person={person}
              />
            ))}
            {/* 添加，index === 0 是部长，没有添加，其他的当人数小于 2 时有添加 */}
            {/* {(index !== 0 && group.TeamPersons.length < 2) && <OrganizationPerson
              onClick={() => setAddModalVisible(true)}
              key={'add'}
            />} */}
          </Member>
        )}
      </div>

      {/* 修改权限的对话 Modal */}
      <Modal
        title="添加成员"
        visible={updateModalVisible}
        centered
        onCancel={closeUpdateModal}
        footer={null}
        destroyOnClose
      >
        <Form name="modal-form" onFinish={submitUpdate} layout="vertical">
          <Form.Item
            name="authValue"
            label="请选择权限获取人"
          >
            <Radio.Group>
              {organization.canAuthList.map(canAuth => (
                <Radio style={radioStyle} value={canAuth.id} key={canAuth.id}>
                  {canAuth.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加的对话 Modal */}
      {/* <Modal
        title="添加成员"
        visible={addModalVisible}
        centered
        onCancel={close}
        footer={null}
      >
        <Form name="modal-form" onFinish={submit} layout="vertical">
          <Form.Item
            name="stu_num"
            label="成员学号"
            rules={[{ required: true, message: '请填写学号', max: 10 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  )
}

export default connect((state: ConnectState) => ({
  organization: state.organization,
}))(OrganizationAuth)
