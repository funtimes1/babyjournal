import React from "react";
import { Layout } from "../components/Layout.components";
import { LoadingIndicator } from "../components/Loading.component";

export const LoadingScreen: React.FC = () => {
  return (
    <Layout.Column grow center>
      <LoadingIndicator />
    </Layout.Column>
  );
};
