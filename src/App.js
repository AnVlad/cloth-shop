import { Route, Routes } from 'react-router-dom';
import './default.scss';
import Home from './pages/Homepage/Home';
import Registration from './pages/Registration/Registration';
import MainLayout from './layouts/MainLayout';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='registration' element={<Registration />} />
        </Routes>
        <Footer />
      </MainLayout>
    </>
  );
}

export default App;
