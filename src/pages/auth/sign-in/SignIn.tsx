import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SignInType } from '../../../interfaces';
import { signIn } from '../../../redux/actions/user';
import { userIsAuthSelector, userLoadingSelector } from '../../../redux/selectors/user';
import { RootState } from '../../../redux/store';
import styles from '../auth.module.scss';

type StateProps = {
  loading: boolean;
  isAuth: boolean;
};

type DispatchProps = {
  signIn: (requestBody: SignInType) => void;
};

type Props = StateProps & DispatchProps;

type Inputs = SignInType;

const SignIn = ({ loading, signIn }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

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
          onClick={handleSubmit(signIn)}
          type="submit"
          value="Войти"
          disabled={loading}
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

const mapStateToProps = (state: RootState) => ({
  loading: userLoadingSelector(state),
  isAuth: userIsAuthSelector(state),
});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
