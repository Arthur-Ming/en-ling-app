import { ReactComponent as UserIcon } from './user.svg';
import styles from './auth-link.module.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { userNameSelector } from '../../../redux/selectors/user';
import { useEffect } from 'react';
import { getUserById } from '../../../redux/actions/user';

type StateProps = {
  userName: string | null;
};

type DispatchProps = {
  getUserById: () => void;
};

type Props = StateProps & DispatchProps;

const AuthLink = ({ userName, getUserById }: Props) => {
  useEffect(() => {
    getUserById();
  }, [getUserById]);
  return (
    <NavLink to={`auth/sign-in`} className={styles.box}>
      {userName && <span>{userName}</span>}
      <span className={styles.text}>войти</span>
      <UserIcon className={styles.icon} />
    </NavLink>
  );
};

const mapStateToProps = (state: RootState) => ({
  userName: userNameSelector(state),
});

const mapDispatchToProps = {
  getUserById,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLink);
