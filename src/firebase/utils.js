import app from './config';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const auth = getAuth(app);

const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

const handleUserProfile = async (authUser, additionalData) => {
  if (!authUser) return;

  const { uid } = authUser;

  const userRef = doc(db, `users/${uid}`);

  const result = await getDoc(userRef);

  if (!result.exists()) {
    const { displayName, email } = authUser;
    const createdDate = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdDate,
        ...additionalData,
      });
    } catch (error) {
      console.log('error while setting doc', error);
    }
  }

  return userRef;
};

export { auth, handleUserProfile };
