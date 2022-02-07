import React from "react";
import { NavBar } from "./NavBar";
import { Calendar } from "./Calendar";
import { Layout, Spacer } from "../theme/Layout.components";
import { MainContent } from "./MainContent";

export const AppLayout: React.FunctionComponent = () => {
  return (
    <Layout.Column style={{ height: "100vh" }} bg="green-300">
      {/* NavBar */}
      <NavBar />
      {/* App Content */}
      <Layout.Column grow>
        <Layout.Row bg="blue-200" grow>
          {/* Sidebar */}
          <Layout.Column>
            {/* Calendar */}
            <Calendar />

            <Spacer.Flex />
            {/* Settings */}
            <Layout.Column bg="green-200" px py>
              Settings!!!
            </Layout.Column>
          </Layout.Column>
          {/* Main Content */}

          <Layout.Column grow bg="orange-200" px py>
            <MainContent />
          </Layout.Column>
        </Layout.Row>
      </Layout.Column>
    </Layout.Column>
  );
};
