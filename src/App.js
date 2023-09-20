import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './default.scss';

import Home from './pages/Homepage/Home';
import Registration from './pages/Registration/Registration';
import MainLayout from './layouts/MainLayout';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Recovery from './pages/Recovery/Recovery';
import { checkUserAuth } from './redux/userSlice';
import Dashboard from './pages/Dashboard/Dashboard';
import WithAdminAuth from './hoc/WithAdminAuth';
import AdminToolbar from './components/AdminToolbar/AdminToolbar';
import AddProductModal from './components/AddProductModal/AddProductModal';
import AdminLayout from './layouts/AdminLayout';
import WithModalState from './hoc/WithModalState';
import Admin from './pages/Admin/Admin';
import Search from './pages/Search/Search';
import { setStartProducts } from './redux/productsSlice';
import ProductCard from './pages/ProductCard/ProductCard';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import MobileNavModal from './components/ModalComponents/MobileNavModal/MobileNavModal';

function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const products = useSelector((state) => state.products);

  const addProductState = useSelector((state) => state.modalState.addProduct);
  const mobileNavState = useSelector((state) => state.modalState.mobileNav);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());

    if (products.length > 0) return;
    dispatch(setStartProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <WithModalState state={addProductState}>
        <AddProductModal />
      </WithModalState>
      <WithModalState state={mobileNavState}>
        <MobileNavModal />
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
          <Route path='cart' element={<Checkout />} />

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

          <Route exact path='search' element={<Search />} />
          <Route path='search/:filterType' element={<Search />} />
          <Route path='product/:id' element={<ProductCard />} />
          <Route path='payment' element={<Payment />} />
        </Routes>
        <Footer />
      </MainLayout>
    </>
  );
}

export default App;
