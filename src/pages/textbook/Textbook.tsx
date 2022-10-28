import TextbookSidebar from './textbook-sidebar';
import styles from './textbook.module.scss';
import TextbookHeader from './textbook-header';
import TextbookFooter from './textbook-footer';
import { Navigate, Outlet, useMatch } from 'react-router';
import ArrowButton from './arrow-button';
import useTextbookPageParams from '../../hooks/useTextbookPageParams';
import { useEffect } from 'react';
import clientRoutes from '../../utils/clientRoutes';

const Textbook = () => {
  const { page, group } = useTextbookPageParams();

  useEffect(() => {
    const syncTextbookParamsToStorage = () => {
      localStorage.setItem('page', String(page));
      localStorage.setItem('group', String(group));
    };
    syncTextbookParamsToStorage();
    /*   window.addEventListener('beforeunload', syncTextbookParamsToStorage);

    return () => {
      window.removeEventListener('beforeunload', syncTextbookParamsToStorage);
    }; */
  }, [page, group]);

  const match = useMatch(clientRoutes.textbook.words.absolute());

  if (!match) {
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
