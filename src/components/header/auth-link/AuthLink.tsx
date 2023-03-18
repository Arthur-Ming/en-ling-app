import { ReactComponent as UserIcon } from './user.svg';
import styles from './auth-link.module.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { userIsAuthSelector, userNameSelector } from '../../../redux/selectors/user';
import { useEffect } from 'react';

type StateProps = {
  userName: string | null;
  isAuth: boolean;
};

type Props = StateProps;

const AuthLink = ({ userName, isAuth }: Props) => {
  if (isAuth)
    return (
      <span className={styles.box}>
        {userName && <span>{userName}</span>}
        <UserIcon className={styles.icon} />
      </span>
    );

  return (
    <NavLink to={`/login`} className={styles.box}>
      {userName && <span>{userName}</span>}
      <span className={styles.text}>войти</span>
      <UserIcon className={styles.icon} />
    </NavLink>
  );
};

const mapStateToProps = (state: RootState) => ({
  userName: userNameSelector(state),
  isAuth: userIsAuthSelector(state),
});

export default connect(mapStateToProps)(AuthLink);
