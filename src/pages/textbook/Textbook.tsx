import TextbookCards from './textbook-cards';
import TextbookSidebar from './textbook-sidebar';
import styles from './textbook.module.scss';
import TextbookHeader from './textbook-header';
import TextbookFooter from './textbook-footer';
import { Navigate, Route, Routes, useMatch } from 'react-router';
import ArrowButton from './arrow-button';
import useTextbookPageParams from '../../hooks/useTextbookPageParams';

const Textbook = () => {
  const { page, group } = useTextbookPageParams();
  const match = useMatch('/textbook/:page/:group');

  if (!match) {
    return <Navigate to={`/textbook/${page + 1}/${group + 1}`} replace />;
  }
  return (
    <main className={styles.root}>
      <TextbookHeader />
      <div className={styles.body}>
        <TextbookSidebar />
        <ArrowButton prev />
        <Routes>
          <Route path={`:page/:group`} element={<TextbookCards />} />
        </Routes>
        <ArrowButton />
      </div>
      <TextbookFooter />
    </main>
  );
};

export default Textbook;
