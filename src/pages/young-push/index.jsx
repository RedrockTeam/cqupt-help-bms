import React, { useState, useEffect } from 'react'
import { Link, connect, Loading, ConnectRC } from 'umi'
import { Table, Button, Checkbox, Modal, Steps } from 'antd'
import PageHeader from '@/components/pageHeader'
import PageHeaderBtn from '@/components/pageHeaderBtn'
import sharedStyles from '@/assets/styles.css'
import styles from './index.css'

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '学号', dataIndex: 'stu_num', key: 'stu_num' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
]

const YoungPush = ({ young, loading }) => {
  const [selectedIds, setSelectedIds] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [pushStep, setPushStep] = useState(0)
  const list = young.current.data
  const step = young.current.step

  useEffect(() => {
    if (selectedIds.length === list.length) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [list.length, selectedIds.length])
  const selectAll = () => {
    if (isChecked) {
      setSelectedIds([])
    } else {
      setSelectedIds(list.map(e => e.id))
    }
  }

  const handleOk = () => {

  }
  const handleCancel = () => {
    setIsShow(false)
  }

  return (
    <div>
      <PageHeader title={`第 ${step} 轮选拔推送名单`}>
        <PageHeaderBtn type="history">
          <Link to="/young-push/history" className={sharedStyles.pageHeaderBtn}>已推送名单</Link>
        </PageHeaderBtn>
      </PageHeader>
      <div className={styles.wrapper}>
        <Table
          rowSelection={{
            selectedRowKeys: selectedIds,
            onChange(keys) {
              setSelectedIds(keys)
            },
          }}
          pagination={{
            className: styles.pagination
          }}
          columns={columns}
          loading={loading}
          dataSource={list.map(i => ({ ...i, key: i.id }))}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
            position: 'relative',
          }}
        >
          <Checkbox
            style={{
              position: 'absolute',
              top: '-40px',
              left: '24px',
            }}
            onChange={selectAll}
            checked={isChecked}
          ><span style={{ marginLeft: '29px' }}>所有页面全选</span></Checkbox>
          <Button
            type="primary"
            onClick={() => {
              if (selectedIds.length) {
                const modal = Modal.confirm({
                  title: `第 ${step} 轮推送信息录入`,
                  content: (
                    <div>
                      <div>
                        <Steps current={pushStep} size="small">
                          <Steps.Step title="推送形式" />
                          <Steps.Step title="信息录入" />
                          <Steps.Step title="信息核对" />
                        </Steps>
                      </div>

                    </div>
                  ),
                  onOk(close) {
                    if (pushStep < 3) {
                      console.log(pushStep)
                      setPushStep(pushStep + 1)
                    } else {
                      close()
                    }
                  },
                  onCancel(close) {
                    setPushStep(0)
                    close()
                  }
                })
              }
            }}
            className={sharedStyles.okButton}
          >发送推送</Button>
        </div>
      </div>
    </div>
  )
}

export default connect(({ young, loading }) => ({
  young,
  loading: loading.effects['young/fetchCurrentInfo'],
}))(YoungPush)
