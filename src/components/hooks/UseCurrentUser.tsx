import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export function useCurrentUser() {
  const [user] = useAuthState(auth);
  return user;
}
