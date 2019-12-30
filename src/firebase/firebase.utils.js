import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCjbMHqmO1khABK5NX8Z6sbYcnszm2AQME",
    authDomain: "crown-store-14f05.firebaseapp.com",
    databaseURL: "https://crown-store-14f05.firebaseio.com",
    projectId: "crown-store-14f05",
    storageBucket: "crown-store-14f05.appspot.com",
    messagingSenderId: "518874670625",
    appId: "1:518874670625:web:953992babefc8c668fe560",
    measurementId: "G-ZZ4DTRKRG2"
  };

export const createUserProfileDocument = async (userAuth, additionaldata) => {
  if (!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  
  if (!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionaldata
      })
    }catch (error){
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
