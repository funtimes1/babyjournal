import firebase from "../../firebase";
import { useCurrentUser } from "../hooks/UseCurrentUser";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { AddJournal } from "../journal-entry/AddJournal";
import { JournalList } from "../journal-entry/JournalList";

// export const Auth = () => {
//   const login = () => {
//     firebase.auth().signInWithEmailAndPassword("test@test.com", "password");
//   };
//   const logout = () => {
//     firebase.auth().signOut();
//   };

//
export const Auth: React.FunctionComponent = () => {
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
  return <UnAuthenticatedApp />;
};
//User information such as ID contained in and accessible via Authenticated App
const AuthenticatedApp: React.FC = () => {
  const user = useCurrentUser();

  return (
    <div>
      {/* JSON stringify converts object or value to a JSON string */}
      <AddJournal />
      <JournalList />
      {/* {JSON.stringify(user, null, 2)} */}
      USER ID: {user.uid}
      <br></br>
      USER EMAIL: {user?.email}
      <br></br>
      <button onClick={() => firebase.auth().signOut()}>LOGOUT</button>
    </div>
  );
};
const UnAuthenticatedApp: React.FC = () => {
  return (
    <div>
      <Login />
      <span>or</span>
      <Signup />
    </div>
  );
};
