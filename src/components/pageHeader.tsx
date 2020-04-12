import React from 'react'
import styles from './pageHeader.css'

const PageHeader: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.btns}>
        {children}
      </div>
    </div>
  )
}

export default PageHeader
