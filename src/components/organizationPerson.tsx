import React, { ReactNode } from 'react'
import styles from './organizationPerson.css'
import { Avatar } from 'antd'
import { TeamPerson } from '@/interfaces/organization'

const PageHeader = ({ person, onClick }: {
  person?: TeamPerson,
  onClick?: (e: React.MouseEvent) => void,
}) => {
  return (
    <div className={styles.organizationPerson} onClick={onClick}>
      <Avatar
        className={styles.avatar}
        style={{ background: '#F5F8FF' }}
        shape="square"
        src={person?.avatar}
      />
      <div style={{ color: person ? '#2B2E37' : '#36CA94' }}>{person?.name ?? '添加'}</div>
    </div>
  )
}

export default PageHeader
