import { Navigate, Route, Routes } from 'react-router';
import SignIn from './sign-in';
import SignUp from './sign-up';
import styles from './auth.module.scss';

const Auth = () => (
  <main className={styles.wrapper}>
    <div className={styles.box}>
      <Routes>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/*" element={<Navigate to="sign-in" replace={true} />} />
      </Routes>
    </div>
  </main>
);

export default Auth;
