import { useCurrentUser } from "./hooks/UseCurrentUser";
import { auth } from "../firebase";
import { x } from "@xstyled/styled-components";
import { Layout, Spacer } from "../theme/Layout.components";

export const NavBar: React.FC = () => {
  const user = useCurrentUser();
  return (
    <Layout.Row bg="red-200">
      **LOGO**
      <div>Hi</div>
      <Spacer.Flex debug />
      <Layout.Row>
        <p className="purple">
          <b>USER ID:</b> {user?.uid} <br></br>
          <b>USER EMAIL</b> {user?.email}
        </p>
        <Layout.Row px py>
          <button onClick={() => auth.signOut()}>LOGOUT</button>{" "}
        </Layout.Row>
      </Layout.Row>
    </Layout.Row>
  );
};

const FlexSpacer: React.FC = () => {
  return <x.div flex="1" backgroundColor="green-200" />;
};
