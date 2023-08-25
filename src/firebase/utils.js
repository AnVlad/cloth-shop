import app from './config';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const auth = getAuth(app);

const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInByGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

const handleUserProfile = async (authUser, additionalData) => {
  if (!authUser) return;

  const { uid } = authUser;

  const userRef = doc(db, `users/${uid}`);

  const result = await getDoc(userRef);

  console.log(result.exists());

  if (!result.exists()) {
    const { displayName, email } = authUser;
    const timeSnap = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdDate: timeSnap,
        ...additionalData,
      });
    } catch (error) {
      console.log('error while setting doc', error);
    }
  }

  return userRef;
};

export { auth, signInByGoogle, handleUserProfile };
