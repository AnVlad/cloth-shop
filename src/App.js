import { Navigate, Route, Routes } from 'react-router-dom';
import './default.scss';
import Home from './pages/Homepage/Home';
import Registration from './pages/Registration/Registration';
import MainLayout from './layouts/MainLayout';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import { useEffect, useState } from 'react';
import { auth, handleUserProfile } from './firebase/utils';
import { onSnapshot } from 'firebase/firestore';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authUser = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });

        return;
      }

      setCurrentUser(null);

      return;
    });

    return () => authUser();
  }, []);

  console.log(currentUser);

  return (
    <>
      <MainLayout currentUser={currentUser}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='registration' element={<Registration />} />
          <Route
            path='login'
            element={!currentUser ? <Login /> : <Navigate to={'/'} />}
          />
        </Routes>
        <Footer />
      </MainLayout>
    </>
  );
}

export default App;
