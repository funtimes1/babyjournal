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
var firebaseConfig = {
  apiKey: 'AIzaSyDcp_Nh7DELDBpj2BSkQzx9KZg0jHa9JTM',
  authDomain: 'babyjournal11.firebaseapp.com',
  projectId: 'babyjournal11',
  storageBucket: 'babyjournal11.appspot.com',
  messagingSenderId: '217743478381',
  appId: '1:217743478381:web:dafd441b27e47819153964',
  measurementId: 'G-VTG6PJ7ERL',
};
export const fuego = new Fuego(firebaseConfig);
// fuego.db.enablePersistence().catch((e) => console.warn(e.message));
// const buildType = Constants.manifest.extra.buildType;

export const deleteField = firebase.firestore.FieldValue.delete;

export const emailAuthProvider = firebase.auth.EmailAuthProvider;
