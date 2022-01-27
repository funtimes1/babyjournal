import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";

var firebaseConfig = {
  apiKey: "AIzaSyDcp_Nh7DELDBpj2BSkQzx9KZg0jHa9JTM",
  authDomain: "babyjournal11.firebaseapp.com",
  projectId: "babyjournal11",
  storageBucket: "babyjournal11.appspot.com",
  messagingSenderId: "217743478381",
  appId: "1:217743478381:web:dafd441b27e47819153964",
  measurementId: "G-VTG6PJ7ERL",
};

export const app = initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = getAuth(app);
