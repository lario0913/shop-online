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

  firebase.initializeApp(config);

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

export const addCollectionandDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj);
  })
  return await batch.commit()
}

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  
  return transformedCollection.reduce((accumulator, collection)=> {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
