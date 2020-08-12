import React, { ReactNode } from 'react';
import styles from './organizationMember.css';

const Member = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div>
      <div className={styles.organizationJobTitle}>{title.split('：')[1]}</div>
      <div className={styles.organizationPersons}>{children}</div>
    </div>
  );
};

export default Member;
