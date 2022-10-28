import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import styles from '../auth.module.scss';

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <>
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
          onClick={handleSubmit(onSubmit)}
          type="submit"
          value="Войти"
        />
      </form>
      <div className={styles.text}>
        <span>Нет аккаунта?</span>
        <NavLink className={styles.link} to="/auth/sign-up">
          Зарегистрируйтесь
        </NavLink>
      </div>
    </>
  );
};

export default SignIn;
