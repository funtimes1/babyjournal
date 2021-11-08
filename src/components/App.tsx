import firebase from "../firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthenticatedApp } from "./auth/AuthenticatedApp";
import { UnauthenticatedApp } from "./auth/UnauthenticatedApp";

// export const Auth = () => {
//   const login = () => {
//     firebase.auth().signInWithEmailAndPassword("test@test.com", "password");
//   };
//   const logout = () => {
//     firebase.auth().signOut();
//   };
//
export const App: React.FunctionComponent = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    //render journal entries of user
    return <AuthenticatedApp />;
  }
  // render login / signup here
  return <UnauthenticatedApp />;
};
