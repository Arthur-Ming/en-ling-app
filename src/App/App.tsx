import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Footer from '../components/footer';
import Header from '../components/header';
import Main from '../pages/main';

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
