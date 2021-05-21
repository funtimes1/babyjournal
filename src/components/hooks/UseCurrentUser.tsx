import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/auth";
import firebase from "../../firebase";

export function useCurrentUser() {
  const [user] = useAuthState(firebase.auth());
  return user;
}
