import data from './data';
import TextbookCards from './textbook-cards';
import TextbookSidebar from './textbook-sidebar';
import styles from './textbook.module.scss';
import TextbookHeader from './textbook-header';
import TextbookFooter from './textbook-footer';

const Textbook = () => {
  return (
    <main className={styles.root}>
      <TextbookHeader />
      <div className={styles.body}>
        <TextbookSidebar />
        <TextbookCards cards={data} />
      </div>
      <TextbookFooter />
    </main>
  );
};

export default Textbook;
