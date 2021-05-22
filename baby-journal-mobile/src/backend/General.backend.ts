// import 'expo-firestore-offline-persistence'; // 👋 import this first

// This import loads the firebase namespace along with all its type information.
// import Constants from 'expo-constants';
import firebase from 'firebase/app';

import { Fuego } from './fuego';
// These imports load individual services into the firebase namespace.
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/functions';

// const firebaseConfig = Constants.manifest.extra?.firebase;
const firebaseConfig = {
  apiKey: 'AIzaSyCdhUfwTdA6DCGtCPador9BfVM5jTX7dcE',
  authDomain: 'easy-expense-dev.firebaseapp.com',
  databaseURL: 'https://easy-expense-dev.firebaseio.com',
  projectId: 'easy-expense-dev',
  storageBucket: 'easy-expense-dev.appspot.com',
  messagingSenderId: '656576554418',
  appId: '1:656576554418:web:4b2317316cb7fd678770ab',
  measurementId: 'G-20644XXPQV',
};
export const fuego = new Fuego(firebaseConfig);
// fuego.db.enablePersistence().catch((e) => console.warn(e.message));
// const buildType = Constants.manifest.extra.buildType;

export const deleteField = firebase.firestore.FieldValue.delete;

export const emailAuthProvider = firebase.auth.EmailAuthProvider;
