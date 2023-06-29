import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEBuEYHfY62YbzMgIQVNR2fNBB9UuqSB8",
  authDomain: "clothingdb-cb4c8.firebaseapp.com",
  projectId: "clothingdb-cb4c8",
  storageBucket: "clothingdb-cb4c8.appspot.com",
  messagingSenderId: "943063493344",
  appId: "1:943063493344:web:b4d2f930e0fc2b36e63e85"
};

// Initialize the Firebase app with the provided configuration
const firebaseApp = initializeApp(firebaseConfig);

// Create a GoogleAuthProvider instance
const googleProvider = new GoogleAuthProvider();

// Set custom parameters for the Google sign-in provider
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Get the authentication service instance
export const auth = getAuth();

// Function to initiate Google sign-in using a pop-up window
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Function to initiate Google sign-in by redirecting to the Google sign-in page
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Get the Firestore database instance
export const db = getFirestore();

// Function to add a collection and multiple documents to the Firestore database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // Get a reference to the collection in the database
  const collectionRef = collection(db, collectionKey);
  
  // Create a batch write operation
  const batch = writeBatch(db);

  // Iterate over the objects to be added and set the documents in the batch
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  // Commit the batch write operation to save the changes in the database
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

// Function to create a user document in Firestore based on the authenticated user information
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  // Return if user authentication information is not provided
  if (!userAuth) return;

  // Get a reference to the user document in the Firestore database
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  // Get the snapshot of the user document
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // Check if the user document already exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Create the user document in Firestore with the provided information
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch(error) {
      console.log('Error creating the user', error.message);
    }
  }
  return userDocRef;
};

// Function to create a user account using email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // Return if email or password is not provided
  if (!email || !password) return;

  // Create the user account using email and password
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Function to sign in a user using email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // Return if email or password is not provided
  if (!email || !password) return;

  // Sign in the user using email and password
  return await signInWithEmailAndPassword(auth, email, password);
};

// Function to sign out the user
export const signOutUser = async () => await signOut(auth);

// Function to listen for changes in the authentication state
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
