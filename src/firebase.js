import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDcp_Nh7DELDBpj2BSkQzx9KZg0jHa9JTM",
  authDomain: "babyjournal11.firebaseapp.com",
  projectId: "babyjournal11",
  storageBucket: "babyjournal11.appspot.com",
  messagingSenderId: "217743478381",
  appId: "1:217743478381:web:dafd441b27e47819153964",
  measurementId: "G-VTG6PJ7ERL",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
