import React, { ReactNode } from 'react';
import styles from './pageHeader.css';

const PageHeader = ({
  children,
  title,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.btns}>{children}</div>
    </div>
  );
};

export default PageHeader;
