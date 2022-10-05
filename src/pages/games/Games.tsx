import { Navigate, Outlet, Route, Routes, useMatch } from 'react-router';
import AudioCall from '../audio-call';
import AudioCallGame from '../audio-call/audio-call-game';
import Sprint from '../sprint';
import SprintGame from '../sprint/sprint-game';
import styles from './games.module.scss';
import SprintEntry from './sprint-entry';

const HG = () => (
  <main className={styles.box}>
    <SprintEntry />
  </main>
);

const Games = () => {
  return (
    <Routes>
      <Route path="/" element={<HG />} />
      <Route path="sprint/*" element={<Sprint />}>
        <Route path=":group" element={<SprintGame />} />
      </Route>
      <Route path="audio-call/*" element={<AudioCall />}>
        <Route path=":group" element={<AudioCallGame />} />
      </Route>
      <Route path="/*" element={<Navigate to="/games" replace={true} />} />
    </Routes>
  );
  /*  return (
    <main className={styles.box}>
      <SprintEntry />
    </main>
  ); */
};
export default Games;
