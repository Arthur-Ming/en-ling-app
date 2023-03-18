import { ReactComponent as UserIcon } from './user.svg';
import styles from './auth-link.module.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { userIsAuthSelector, userNameSelector } from '../../../redux/selectors/user';
import { useEffect } from 'react';
import { getUserById, signOut } from '../../../redux/actions/user';

type StateProps = {
  userName: string | null;
  isAuth: boolean;
};

type DispatchProps = {
  getUserById: () => void;
  signOut: () => void;
};

type Props = StateProps & DispatchProps;

const AuthLink = ({ userName, signOut, isAuth, getUserById }: Props) => {
  if (isAuth)
    return (
      <span className={styles.box} onClick={signOut}>
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

const mapDispatchToProps = {
  getUserById,
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLink);
