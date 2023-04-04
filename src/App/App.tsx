import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Footer from '../components/footer';
import Header from '../components/header';
import Main from '../pages/main';
import Textbook from '../pages/textbook';
import TextbookWords from '../pages/textbook/TextbookWords';
import clientRoutes from '../utils/clientRoutes';
import Games from '../pages/games';
import Sprint from '../pages/sprint';
import AudioCall from '../pages/audio-call';
import SprintGame from '../pages/sprint/sprint-game';
import AudioCallGame from '../pages/audio-call/audio-call-game';
import ProtectedRoute from './ProtectedRoute';
import Statistics from '../pages/statistics';
import Login from '../pages/Auth/Login';
import Registration from '../pages/Auth/Registration';
import UserWords from '../pages/textbook/UserWords';
import UserWord from '../pages/textbook/UserWords/UserWord';
import TextbookWord from '../pages/textbook/TextbookWords/TextbookWord';

const App = () => (
  <Router>
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={clientRoutes.main()} element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path={`${clientRoutes.textbook.absolute()}/*`} element={<Textbook />}>
          <Route path={`${clientRoutes.textbook.words.relative()}/*`} element={<TextbookWords />}>
            <Route path={`:wordId`} element={<TextbookWord />} />
          </Route>
          <Route path={`user-words/*`} element={<UserWords />}>
            <Route path={`:wordId`} element={<UserWord />} />
          </Route>
        </Route>
        <Route path={`${clientRoutes.games.absolute()}/*`} element={<Games />}>
          <Route path="sprint" element={<Sprint />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;
