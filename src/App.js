import { Navigate, Route, Routes } from 'react-router-dom';
import './default.scss';
import Home from './pages/Homepage/Home';
import Registration from './pages/Registration/Registration';
import MainLayout from './layouts/MainLayout';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import Recovery from './pages/Recovery/Recovery';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from './redux/userSlice';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  // console.log(currentUser);

  return (
    <>
      <MainLayout currentUser={currentUser}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='registration'
            element={!currentUser ? <Registration /> : <Navigate to={'/'} />}
          />
          <Route
            path='login'
            element={!currentUser ? <Login /> : <Navigate to={'/'} />}
          />
          <Route
            path='recovery'
            element={!currentUser ? <Recovery /> : <Navigate to={'/'} />}
          />
          <Route
            path='dashboard'
            element={!currentUser ? <Navigate to={'/login'} /> : <Dashboard />}
          />
        </Routes>
        <Footer />
      </MainLayout>
    </>
  );
}

export default App;
