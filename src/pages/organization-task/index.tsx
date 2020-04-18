import React, { useState, useEffect } from 'react'
import { connect, ConnectProps } from 'umi'
import { OrganizationModelState } from '@/models/organization'
import PageHeader from '@/components/pageHeader'
import Member from '@/components/organizationMember'
import OrganizationPerson from '@/components/organizationPerson'
import sharedStyles from '@/assets/styles.css'
import styles from './index.css'
import { Modal, Input, Button, Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

type ConnectState = {
  organization: OrganizationModelState,
}

type Props = ConnectProps & ConnectState

const OrganizationTask = ({ organization, dispatch }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const publish = () => {
    dispatch!({
      type: 'organization/publishTask',
      payload: {
        title,
        content,
      }
    })
  }
  
  return (
    <div>
      <PageHeader title="任务发布" />
      <div className={sharedStyles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>任务标题</div>
          <Input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.title}>任务详情</div>
          <Input.TextArea
            className={styles.text}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
          />
        </div>
        <Button type="primary" style={{ margin: '20px 0' }} className={sharedStyles.okButton} onClick={publish}>完成</Button>
      </div>
    </div>
  )
}

export default connect((state: ConnectState) => ({
  organization: state.organization,
}))(OrganizationTask)
