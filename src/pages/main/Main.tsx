import Features from './features';
import styles from './main.module.scss';

const Main = () => {
  return (
    <main className={styles.root}>
      <div className={styles.box}>
        <Features />
      </div>
    </main>
  );
};

export default Main;
