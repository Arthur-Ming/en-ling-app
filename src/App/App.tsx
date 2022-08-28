import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Footer from '../components/footer';
import Header from '../components/header';
import Main from '../pages/main';
import Textbook from '../pages/textbook';
import TextbookWords from '../pages/textbook/textbook-words';
import clientRoutes from '../utils/clientRoutes';

const App = () => (
  <Router>
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={clientRoutes.main()} element={<Main />} />
        <Route path={`${clientRoutes.textbook.absolute()}/*`} element={<Textbook />}>
          <Route path={clientRoutes.textbookWords.relative()} element={<TextbookWords />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;
