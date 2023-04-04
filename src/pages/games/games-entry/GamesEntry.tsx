import styles from '../index.module.scss';
import { useNavigate } from 'react-router';

const GamesEntry = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.box}>
      <div onClick={() => navigate('sprint')}>Sprint</div>
    </main>
  );
};

export default GamesEntry;
