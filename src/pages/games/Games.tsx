import { Route, Routes } from 'react-router';
import Sprint from '../sprint';
import GamesEntry from './games-entry/GamesEntry';

const Games = () => (
  <Routes>
    <Route path={`/`} element={<GamesEntry />} />
    <Route path={`sprint`} element={<Sprint />} />
  </Routes>
);

export default Games;
