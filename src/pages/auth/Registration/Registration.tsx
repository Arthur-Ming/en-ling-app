import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useRegisterUserMutation } from '../../../redux/api/users';
import AuthLayout from '../AuthLayout';
import styles from '../index.module.scss';
import RegistrationForm from './RegistrationForm';

type Inputs = {
  email: string;
  name: string;
  password: string;
};

const Registration = () => {
  const [signUp, { isLoading }] = useRegisterUserMutation();

  return (
    <AuthLayout>
      <RegistrationForm isLoading={isLoading} onSubmit={signUp} />
      <div className={styles.text}>
        <span>Уже есть аккаунт?</span>
        <NavLink className={styles.link} to="/login">
          Войдите
        </NavLink>
      </div>
    </AuthLayout>
  );
};

export default Registration;
