import { useCurrentUser } from "./hooks/UseCurrentUser";
import { auth } from "../firebase";
import { x } from "@xstyled/styled-components";

export const NavBar: React.FC = () => {
  const user = useCurrentUser();
  return (
    <x.div
      backgroundColor="red-200"
      h="20"
      position="relative"
      flexDirection="row"
      display="flex"
    >
      <x.div border={4} borderColor="green" w={100} h={10}>
        **LOGO**
      </x.div>

      <FlexSpacer />
      <x.div>
        <x.p>
          <b>USER ID:</b> {user?.uid} <br></br>
          <b>USER EMAIL</b> {user?.email}
        </x.p>

        <x.div paddingTop={2}>
          <button onClick={() => auth.signOut()}>LOGOUT</button>{" "}
        </x.div>
      </x.div>
    </x.div>
  );
};

const FlexSpacer: React.FC = () => {
  return <x.div flex="1" backgroundColor="green-200" />;
};
