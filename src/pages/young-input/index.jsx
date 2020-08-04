import React, { useState } from 'react'
import { connect, ConnectProps } from 'umi'
import PageHeader from '@/components/pageHeader'
import sharedStyles from '@/assets/styles.css'
import styles from './index.css'
import { Input, Button } from 'antd'
import ImageUploader from '@/components/imageUploader'

const YoungInput = () => {
  const [title, setTitle] = useState('产品大经理部')
  const [content, setContent] = useState('牛逼牛逼牛逼牛逼牛逼牛逼')
  const [image, setImage] = useState('')
  const [isUpdateMode, setIsUpdateMode] = useState(false)

  return (
    <div>
      <PageHeader title="部门信息填写" />
      <div className={sharedStyles.wrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>部门名称</div>
          {isUpdateMode
            ? <Input
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            : <div className={styles.unUpdateInput}>{title}</div>}
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.title}>部门介绍</div>
          {isUpdateMode
            ? (<>
                <Input.TextArea
                  className={styles.text}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  maxLength={50}
                />
                <span className={styles.len}>{content.length} / 50</span>
              </>)
            : (
              <div className={styles.unUpdateText}>{content}</div>
            )}
        </div>
        <div className={sharedStyles.inputWrapper}>
          <div className={styles.title}>宣传图片</div>
          <ImageUploader image={image} disabled={!isUpdateMode} setImage={setImage} className={styles.upload} />
          <div className={styles.tips}>请上传16:9大小的部门宣传图</div>
        </div>
        <Button
          type="primary"
          style={{ margin: '20px 0' }}
          className={sharedStyles.okButton}
          onClick={() => {
            if (isUpdateMode) {
              // 
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

export default YoungInput
