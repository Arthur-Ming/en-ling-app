import TextbookSidebar from './textbook-sidebar';
import styles from './textbook.module.scss';
import TextbookHeader from './textbook-header';
import TextbookFooter from './textbook-footer';
import { Navigate, Outlet, Route, Routes, useMatch, useNavigate } from 'react-router';
import ArrowButton from './arrow-button';
import useTextbookPageParams from '../../hooks/useTextbookPageParams';
import { useEffect } from 'react';
import clientRoutes from '../../utils/clientRoutes';
import TextbookWords from './textbook-words';
import TextbookHardWords from './textbook-hard-words';

const Textbook = () => {
  const { page, group } = useTextbookPageParams();
  console.log(page);
  console.log(group);
  useEffect(() => {
    const syncTextbookParamsToStorage = () => {
      localStorage.setItem('page', String(page));
      localStorage.setItem('group', String(group));
    };
    syncTextbookParamsToStorage();
  }, [page, group]);

  const match = useMatch(clientRoutes.textbook.words.absolute());
  console.log(clientRoutes.textbook.words.absolute());
  const match2 = useMatch('textbook/hard-words');

  if (match2) console.log('match2');
  if (match) console.log('match');

  if (!match && !match2) {
    return <Navigate to={clientRoutes.textbook.words.absolute(page, group)} replace />;
  }

  return (
    <main className={styles.root}>
      <TextbookHeader />
      <div className={styles.body}>
        <TextbookSidebar />

        <ArrowButton prev />
        <Outlet />

        <ArrowButton />
      </div>
      <TextbookFooter />
    </main>
  );
};

export default Textbook;
