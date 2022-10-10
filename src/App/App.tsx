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

const App = () => (
  <Router>
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={clientRoutes.main()} element={<Main />} />
        <Route path={`${clientRoutes.textbook.absolute()}/*`} element={<Textbook />}>
          <Route path={clientRoutes.textbookWords.relative()} element={<TextbookWords />} />
        </Route>
        <Route path={`/${clientRoutes.games.absolute()}/*`} element={<Games />}>
          <Route path="sprint/*" element={<Sprint />}>
            <Route path=":group" element={<SprintGame />} />
          </Route>
          <Route path="audio-call/*" element={<AudioCall />}>
            <Route path=":group" element={<AudioCallGame />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;
