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
import WithAdminAuth from './hoc/WithAdminAuth';
import AdminToolbar from './components/AdminToolbar/AdminToolbar';
import AddProductModal from './components/AddProductModal/AddProductModal';
import AdminLayout from './layouts/AdminLayout';
import WithModalState from './hoc/WithModalState';
import Admin from './pages/Admin/Admin';

function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  // console.log(currentUser);

  return (
    <>
      <WithModalState>
        <AddProductModal />
      </WithModalState>

      <AdminToolbar />
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
          <Route
            path='admin'
            element={
              <AdminLayout>
                <WithAdminAuth>
                  <Admin />
                </WithAdminAuth>
              </AdminLayout>
            }
          />
        </Routes>
        <Footer />
      </MainLayout>
    </>
  );
}

export default App;
