import { ReactComponent as UserIcon } from './user.svg';
import styles from './auth-link.module.scss';
import { NavLink } from 'react-router-dom';

const AuthLink = () => (
  <NavLink to={`auth/sign-in`} className={styles.box}>
    <span className={styles.text}>войти</span>
    <UserIcon className={styles.icon} />
  </NavLink>
);

export default AuthLink;
