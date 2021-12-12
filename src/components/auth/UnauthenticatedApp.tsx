import React from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";

export const UnauthenticatedApp: React.FC = () => {
  return (
    <div>
      <Login />
      <span>or</span>
      <Signup />
    </div>
  );
};
