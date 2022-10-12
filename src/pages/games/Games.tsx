import { Navigate, Route, Routes } from 'react-router';
import AudioCall from '../audio-call';
import AudioCallGame from '../audio-call/audio-call-game';
import Sprint from '../sprint';
import SprintGame from '../sprint/sprint-game';
import GamesEntry from './games-entry';

const Games = () => (
  <Routes>
    <Route path="/" element={<GamesEntry />} />
    <Route path="sprint/*" element={<Sprint />}>
      <Route path=":group" element={<SprintGame />} />
    </Route>
    <Route path="audio-call/*" element={<AudioCall />}>
      <Route path=":group" element={<AudioCallGame />} />
    </Route>
    <Route path="/*" element={<Navigate to="/games" replace={true} />} />
  </Routes>
);

export default Games;
