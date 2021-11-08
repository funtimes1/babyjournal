import { useCurrentUser } from "./hooks/UseCurrentUser";
import firebase from "../firebase";
import { x } from "@xstyled/styled-components";

export const NavBar: React.FC = () => {
  const user = useCurrentUser();
  return (
    <x.div>
      <x.div float="left" border={4} borderColor="green" w={100} h={10}>
        **LOGO**
      </x.div>
      <x.div float="right">
        <x.p>
          <b>USER ID:</b> {user?.uid} <br></br>
          <b>USER EMAIL</b> {user?.email}
        </x.p>

        <x.div paddingTop={2}>
          <button onClick={() => firebase.auth().signOut()}>LOGOUT</button>{" "}
        </x.div>
      </x.div>
    </x.div>
  );
};
