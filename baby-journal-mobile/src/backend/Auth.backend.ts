import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

import { fuego } from './General.backend';

export function signUp(email: string, password: string) {
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  const user = currentUser();
  if (user) {
    return user.linkWithCredential(credential);
  } else {
    return fuego.auth().createUserWithEmailAndPassword(email, password);
  }
}

export function login(email: string, password: string) {
  return fuego.auth().signInWithEmailAndPassword(email, password);
}

export async function signInGuest() {
  const user = await fuego.auth().signInAnonymously();

  return user;
}

export function logout() {
  return fuego.auth().signOut();
}

export function currentUser() {
  return fuego.auth().currentUser;
}

export function useAuth() {
  return useAuthState(fuego.auth());
}

export function useUser() {
  const [user] = useAuthState(fuego.auth());
  return user;
}
