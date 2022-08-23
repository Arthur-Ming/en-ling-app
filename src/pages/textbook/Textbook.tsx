import data from './data';
import TextbookCards from './textbook-cards';
import TextbookSidebar from './textbook-sidebar';
import styles from './textbook.module.scss';
import TextbookHeader from './textbook-header';
import TextbookFooter from './textbook-footer';
import { Navigate, Route, Routes, useMatch } from 'react-router';

const Textbook = () => {
  const match = useMatch('/textbook/:page/:group');

  if (!match) {
    return <Navigate to="/textbook/1/1" replace />;
  }
  return (
    <main className={styles.root}>
      <TextbookHeader />
      <div className={styles.body}>
        <TextbookSidebar />
        <Routes>
          <Route path={`:page/:group`} element={<TextbookCards />} />
        </Routes>
      </div>
      <TextbookFooter />
    </main>
  );
};

export default Textbook;
