import Auth from './auth';
import Logo from './logo';
import NavBar from './nav-bar';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.box}>
        <Logo />
        <NavBar />
        <Auth />
      </div>
    </header>
  );
};

export default Header;
