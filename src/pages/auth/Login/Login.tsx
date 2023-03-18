import { NavLink } from 'react-router-dom';
import { useLoginUserMutation } from '../../../redux/api/users';
import AuthLayout from '../AuthLayout';
import styles from '../index.module.scss';
import LoginForm from './LoginForm';

const Login = () => {
  const [login, { isLoading }] = useLoginUserMutation();

  return (
    <AuthLayout>
      <LoginForm isLoading={isLoading} onSubmit={login} />
      <div className={styles.text}>
        <span>Нет аккаунта?</span>
        <NavLink className={styles.link} to="/registration">
          Зарегистрируйтесь
        </NavLink>
      </div>
    </AuthLayout>
  );
};

export default Login;
