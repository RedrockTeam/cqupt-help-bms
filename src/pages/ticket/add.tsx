import React, { useState } from 'react'
import { connect, ConnectProps } from 'umi'
import { Input, DatePicker, Button, message } from 'antd'
import PageHeader from '@/components/pageHeader'
import sharedStyles from '@/assets/styles.css'
import { createAddTicket } from '@/models/ticket'
import ImageUploader from '@/components/imageUploader'

type Props = ConnectProps

const AddTicket = ({ dispatch }: Props) => {
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [timePlay, setTimePlay] = useState<number>()
  const [location, setLocation] = useState<string>('')
  const [timeOut, setTimeOut] = useState<number>()
  const [num, setNum] = useState<number>(0)

  return (
    <div>
      <PageHeader title="新建影票"></PageHeader>
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.inputWrapper} style={{ margin: 0 }}>
          <span className={sharedStyles.name}>电影名称</span>
          <Input className={sharedStyles.inputBorder} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>影票图片</span>
          <ImageUploader image={image} setImage={setImage} />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>放映时间</span>
          <DatePicker
            showTime
            className={sharedStyles.inputBorder}
            onChange={(dates) => {
              setTimePlay(dates?.unix())
            }}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>放映地点</span>
          <Input className={sharedStyles.inputBorder} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>抢票时间</span>
          <DatePicker
            showTime
            className={sharedStyles.inputBorder}
            onChange={(date) => {
              setTimeOut(date?.unix())
            }}
          />
        </div>
        <div className={sharedStyles.inputWrapper}>
          <span className={sharedStyles.name}>放票数量</span>
          <Input className={sharedStyles.inputBorder} type="number" onChange={(e) => setNum(parseInt(e.target.value, 10))} />
        </div>
        <Button
          type="primary"
          style={{margin: '20px 0'}}
          className={sharedStyles.okButton}
          onClick={() => {
            if (timePlay && timeOut) {
              dispatch!(createAddTicket(name, image, timePlay, location, timeOut, num))
            } else {
              message.warn('请填写完整信息')
            }
          }}
        >完成</Button>
      </div>
    </div>
  )
}

export default connect()(AddTicket)
