import React, { ReactNode } from 'react'
import styles from './organizationMember.css'
import { OrganizationMember } from '@/interfaces/organization'
import OrganizationPerson from './organizationPerson'

const Member = ({ children, title }: { children: ReactNode, title: string }) => {
  return (
    <div>
      <div className={styles.organizationJobTitle}>{title}</div>
      <div className={styles.organizationPersons}>
        {children}
      </div>
    </div>
  )
}

export default Member
