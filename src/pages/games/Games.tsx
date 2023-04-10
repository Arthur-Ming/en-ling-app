import { Route, Routes } from 'react-router';
import Sprint from '../sprint';
import GamesEntry from './games-entry/GamesEntry';
import AudioChallenge from '../AudioChallenge';

const Games = () => (
  <Routes>
    <Route path={`/`} element={<GamesEntry />} />
    <Route path={`sprint`} element={<Sprint />} />
    <Route path="audiochallenge" element={<AudioChallenge />} />
  </Routes>
);

export default Games;
