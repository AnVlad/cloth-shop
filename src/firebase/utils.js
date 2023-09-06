import app from './config';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

const auth = getAuth(app);

const db = getFirestore(app);
const productsRef = collection(db, 'products');
const getProductRefById = (id) => {
  return;
};

export const googleProvider = new GoogleAuthProvider();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

const getUserRef = async () => {
  const currentUser = await getCurrentUser();

  const { uid } = currentUser;

  const userRef = doc(db, `users/${uid}`);

  return userRef;
};

const handleUserProfile = async (authUser, additionalData) => {
  if (!authUser) return;

  const { uid } = authUser;

  const userRef = doc(db, `users/${uid}`);

  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) return docSnap;

  try {
    const {
      displayName,
      email,
      metadata: { createdAt },
    } = authUser;
    const userRoles = ['user'];

    await setDoc(userRef, {
      displayName,
      email,
      createdAt,
      userRoles,
      ...additionalData,
    });
  } catch (error) {
    console.log('error while setting doc', error);
  }

  const docSnap2 = await getDoc(userRef);

  return docSnap2;
};

export {
  auth,
  db,
  productsRef,
  getProductRefById,
  handleUserProfile,
  getUserRef,
};
