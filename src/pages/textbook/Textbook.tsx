import TextbookSidebar from './TextbookSidebar';
import styles from './textbook.module.scss';
import TextbookHeader from './TextbookHeader';
import TextbookFooter from './TextbookFooter';
import { Navigate, Outlet, Route, Routes, useMatch, useNavigate } from 'react-router';
import ArrowButton from './ArrowButton';

const Textbook = () => {
  /*  const { page, group } = useTextbookPageParams(); */

  /*  useEffect(() => {
    getUsersWords();
  }, [getUsersWords]); */

  /*  useEffect(() => {
    const syncTextbookParamsToStorage = () => {
      localStorage.setItem('page', String(page));
      localStorage.setItem('group', String(group));
    };
    syncTextbookParamsToStorage();
  }, [page, group]); */

  /*  const match = useMatch(clientRoutes.textbook.words.absolute());
  const match2 = useMatch('textbook/hard-words');

  if (!match && !match2) {
    return <Navigate to={clientRoutes.textbook.words.absolute(page, group)} replace />;
  } */

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
