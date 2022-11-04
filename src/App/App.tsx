import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Footer from '../components/footer';
import Header from '../components/header';
import Main from '../pages/main';
import Textbook from '../pages/textbook';
import TextbookWords from '../pages/textbook/textbook-words';
import clientRoutes from '../utils/clientRoutes';
import Games from '../pages/games';
import Sprint from '../pages/sprint';
import AudioCall from '../pages/audio-call';
import SprintGame from '../pages/sprint/sprint-game';
import AudioCallGame from '../pages/audio-call/audio-call-game';
import SignIn from '../pages/auth/sign-in';
import SignUp from '../pages/auth/sign-up';
import Auth from '../pages/auth';
import ProtectedRoute from './ProtectedRoute';
import Statistics from '../pages/statistics';

const App = () => (
  <Router>
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={clientRoutes.main()} element={<Main />} />
        <Route path="/auth/*" element={<Auth />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path={`${clientRoutes.textbook.absolute()}/*`} element={<Textbook />}>
          <Route path={clientRoutes.textbook.words.relative()} element={<TextbookWords />} />
        </Route>
        <Route path={`${clientRoutes.games.absolute()}/*`} element={<Games />}>
          <Route path={`${clientRoutes.sprint.relative()}/*`} element={<Sprint />}>
            <Route path={clientRoutes.sprint.round.relative()} element={<SprintGame />} />
          </Route>
          <Route path="audio-call/*" element={<AudioCall />}>
            <Route path=":group" element={<AudioCallGame />} />
          </Route>
        </Route>
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />

        {/*   <ProtectedRoute>
          <Route path="/statistics" element={<Statistics />} />
        </ProtectedRoute> */}
        {/*   <Route path="/statistics" element={<Statistics />} /> */}
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;
