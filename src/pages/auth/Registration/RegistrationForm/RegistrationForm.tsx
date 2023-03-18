import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { IRegistrationBody } from '../../../../interfaces';
import styles from './index.module.scss';

type Inputs = IRegistrationBody;

type Props = {
  onSubmit: (body: IRegistrationBody) => void;
  isLoading: boolean;
};

const RegistrationForm = ({ isLoading, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });
  return (
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
        <span>Имя</span>
        <input
          type="text"
          placeholder="name"
          className={classNames(styles.input, {
            [styles.invalid]: errors.name,
          })}
          {...register('name', {
            required: 'this field is required!',
          })}
        />
        {errors.name && <span className={styles.invalid_text}>{errors.name.message}</span>}
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
        disabled={isLoading}
      />
    </form>
  );
};

export default RegistrationForm;
