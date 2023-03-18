import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { SignInType } from '../../../interfaces';
import { useLoginUserMutation } from '../../../redux/api/users';
import AuthLayout from '../AuthLayout';
import styles from '../index.module.scss';

type Inputs = SignInType;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });
  const [login, { isLoading }] = useLoginUserMutation();

  return (
    <AuthLayout>
      <form className={styles.form}>
        <label className={styles.label}>
          <span>Email</span>
          <input
            type="email"
            autoFocus
            autoComplete="off"
            placeholder="email"
            className={classNames(styles.input, {
              [styles.invalid]: errors.email,
            })}
            {...register('email', {
              required: 'this field is required!',
            })}
          />
          {errors.email && <span className={styles.invalid_text}>{errors.email.message}</span>}
        </label>
        <label className={styles.label}>
          <span>Пароль</span>
          <input
            type="password"
            placeholder="password"
            className={classNames(styles.input, {
              [styles.invalid]: errors.password,
            })}
            {...register('password', {
              required: 'this field is required!',
              minLength: {
                value: 5,
                message: 'minimum 5 characters',
              },
            })}
          />
          {errors.password && (
            <span className={styles.invalid_text}>{errors.password.message || 'Error!'}</span>
          )}
        </label>
        <input
          className={styles.button}
          onClick={handleSubmit(login)}
          type="submit"
          value="Войти"
          disabled={isLoading}
        />
      </form>
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
