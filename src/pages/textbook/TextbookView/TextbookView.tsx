import React from 'react';
import { Outlet } from 'react-router';
import ArrowButton from '../ArrowButton';
import TextbookFooter from '../TextbookFooter';
import TextbookHeader from '../TextbookHeader';
import TextbookSidebar from '../TextbookSidebar';
import styles from './index.module.scss';

const TextbookView = () => (
  <main className={styles.root}>
    <div className={styles.body}>
      <TextbookHeader />
      <div className={styles.content}>
        <TextbookSidebar />
        <ArrowButton prev />
        <Outlet />
        <ArrowButton />
      </div>
      <TextbookFooter />
    </div>
  </main>
);

export default React.memo(TextbookView);
