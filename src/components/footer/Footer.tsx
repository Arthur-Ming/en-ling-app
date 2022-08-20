import styles from './footer.module.scss';
import { ReactComponent as GithubIcon } from './github.svg';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.box}>
        <span className={styles.item}>2022</span>
        <a className={styles.item} href="https://github.com/Arthur-Ming">
          <GithubIcon className={styles.icon} />
          <span>Arthur-Ming</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
