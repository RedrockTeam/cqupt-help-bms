import React, { ReactNode } from 'react'
import styles from './organizationPerson.css'
import { Avatar } from 'antd'
import { TeamPerson } from '@/interfaces/organization'

const PageHeader = ({ person, onClick }: {
  person: TeamPerson,
  onClick?: (e: React.MouseEvent) => void,
}) => {
  return (
    <div className={styles.organizationPerson} onClick={onClick}>
      <Avatar className={styles.avatar} shape="square" src={person.avatar} />
      <div>{person.name}</div>
    </div>
  )
}

export default PageHeader
