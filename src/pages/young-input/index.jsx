import React, { useState } from 'react'
import { connect, ConnectProps } from 'umi'
import PageHeader from '@/components/pageHeader'
import sharedStyles from '@/assets/styles.css'
import styles from './index.css'
import { Input, Button } from 'antd'
import ImageUploader from '@/components/imageUploader'
import { createSetTeamInfo, createUpdateTeamInfo } from '@/models/young'

const YoungInput = ({ young, dispatch }) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false)
  const handleChangeTeamInfo = (teamInfo) => dispatch(createSetTeamInfo(teamInfo))

  return (
    <div>
      <PageHeader title="部门信息填写" />
      <div className={sharedStyles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>部门名称</div>
          {isUpdateMode
            ? <Input
                className={styles.input}
                value={young.teamInfo.name}
                onChange={(e) => {
                  handleChangeTeamInfo({
                    ...young.teamInfo,
                    name: e.target.value
                  })
                }}
              />
            : <div className={styles.unUpdateInput}>{young.teamInfo.name}</div>}
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.title}>部门介绍</div>
          {isUpdateMode
            ? (<>
                <Input.TextArea
                  className={styles.text}
                  value={young.teamInfo.detail}
                  onChange={(e) => {
                    handleChangeTeamInfo({
                      ...young.teamInfo,
                      detail: e.target.value
                    })
                  }}
                  rows={6}
                  maxLength={50}
                />
                <span className={styles.len}>{young.teamInfo.detail.length} / 50</span>
              </>)
            : (
              <div className={styles.unUpdateText}>{young.teamInfo.detail}</div>
            )}
        </div>
        <div className={sharedStyles.inputWrapper}>
          <div className={styles.title}>宣传图片</div>
          <ImageUploader
            image={young.teamInfo.avatar}
            disabled={!isUpdateMode}
            setImage={(url) => {
              handleChangeTeamInfo({
                ...young.teamInfo,
                avatar: url,
              })
            }}
            className={styles.upload}
          />
          <div className={styles.tips}>请上传16:9大小的部门宣传图</div>
        </div>
        <Button
          type="primary"
          style={{ margin: '20px 0' }}
          className={sharedStyles.okButton}
          onClick={() => {
            if (isUpdateMode) {
              dispatch(createUpdateTeamInfo(young.teamInfo.detail, young.teamInfo.avatar))
              setIsUpdateMode(false)
            } else {
              setIsUpdateMode(true)
            }
          }}
        >{isUpdateMode ? '提交信息' : '编辑信息'}</Button>
      </div>
    </div>
  )
}

export default connect(({ young, loading }) => ({
  young,
  loading: loading.effects['young/fetchTeamInfo'],
}))(YoungInput)
