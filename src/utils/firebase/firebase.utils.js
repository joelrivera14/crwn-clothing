import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCww6q6_ZO-OwyGjFJsJwK7c6J22uwB5FU",
  authDomain: "crwn-clothing-db-ba64c.firebaseapp.com",
  projectId: "crwn-clothing-db-ba64c",
  storageBucket: "crwn-clothing-db-ba64c.appspot.com",
  messagingSenderId: "990139573619",
  appId: "1:990139573619:web:c6a1dab9d026db9ceb9106",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating  user ", error.message);
    }
  }
  return userDocRef;
};
