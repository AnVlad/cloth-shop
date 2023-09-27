import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { checkUserIsAdmin } from '../utils/checkUserIsAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteError } from '../redux/userSlice';

const MainLayout = ({ children, currentUser }) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.currentUser.errors);
  const loading = useSelector((state) => state.currentUser.loading);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (checkUserIsAdmin(currentUser)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (errors.length === 0) return;

    const timeout = setTimeout(() => {
      dispatch(clearErrors());
    }, 20000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errors, dispatch]);

  const handleCloseError = (index) => {
    dispatch(deleteError(index));
  };

  return (
    <>
      <Header currentUser={currentUser} />
      {loading ? (
        <div className='loading'>
          <div className='loading-show'></div>
        </div>
      ) : (
        ''
      )}

      <div className='errors'>
        {errors.map((error, index) => {
          return (
            <div
              key={index}
              onClick={() => handleCloseError(index)}
              className='error-message'>
              {error}
            </div>
          );
        })}
      </div>
      <div className={`main ${isAdmin ? 'main-admin' : ''}`}>{children}</div>
    </>
  );
};

export default MainLayout;
