import { Preflight } from "@xstyled/styled-components";
import React from "react";
import { ThemeProvider } from "styled-components";
import { auth } from "../firebase";
import { theme } from "../theme/Theme";
import { AuthenticatedApp } from "./auth/AuthenticatedApp";
import { UnauthenticatedApp } from "./auth/UnauthenticatedApp";
import { useAuthState } from "react-firebase-hooks/auth";

export const App: React.FC = () => {
  return (
    <>
      <ThemeProvider
        theme={{
          ...theme,
          debugBorders: false,
        }}
      >
        <Preflight />
        <InnerApp />
      </ThemeProvider>
    </>
  );
};

const InnerApp: React.FunctionComponent = () => {
  const [user, loading, error] = useAuthState(auth);

  // export const Auth = () => {
  //   const login = () => {
  //     firebase.auth().signInWithEmailAndPassword("test@test.com", "password");
  //   };
  //   const logout = () => {
  //     firebase.auth().signOut();
  //   };
  //

  if (loading) {
    return (
      <div>
        <p>Initializing User...</p>
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
    return (
      <>
        <AuthenticatedApp />
      </>
    );
  }
  // render login / signup here
  return <UnauthenticatedApp />;
};
