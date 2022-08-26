import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Footer from '../components/footer';
import Header from '../components/header';
import Main from '../pages/main';
import Textbook from '../pages/textbook';
import TextbookWords from '../pages/textbook/textbook-words';

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/textbook/*" element={<Textbook />}>
            <Route path={`:page/:group`} element={<TextbookWords />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
