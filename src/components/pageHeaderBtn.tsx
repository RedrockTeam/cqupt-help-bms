import React from 'react'
import styles from './pageHeaderBtn.css'
import {
  ClockCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'

const PageHeaderBtn: React.FC<{
  type: 'add' | 'history',
  onClick?: (e: React.MouseEvent) => void
}> = ({ children, type, onClick }) => {
  function Icon() {
    if (type === 'add') {
      return <PlusOutlined />
    } else if (type === 'history') {
      return <ClockCircleOutlined />
    }
    return null
  }

  return (
    <div
      className={styles.btn}
      style={{ color: type === 'add' ? '#36CA94' : '#636B81' }}
      onClick={onClick}
    >
      <Icon />
      <span>{children}</span>
    </div>
  )
}

export default PageHeaderBtn
