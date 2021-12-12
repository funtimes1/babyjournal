import React from "react";
import { Layout, Spacer } from "../theme/Layout.components";

export const AppLayout: React.FunctionComponent = () => {
  return (
    <Layout.Column style={{ height: "100vh" }} bg="green-300">
      {/* NavBar */}
      <Layout.Row bg="red-300" size={48} px py={8}>
        <Layout.Column center>Title</Layout.Column>
        <Spacer.Flex />
        <Layout.Column center px bg="success" radius>
          Login
        </Layout.Column>
      </Layout.Row>
      {/* App Content */}
      <Layout.Column grow>
        <Layout.Row bg="blue-200" grow>
          {/* Sidebar */}
          <Layout.Column size={280}>
            {/* Calendar */}
            <Layout.Column
              bg="calendarBackground"
              style={{ height: 280 }}
              px
              py
            >
              Calendar
            </Layout.Column>
            <Spacer.Flex />
            {/* Settings */}
            <Layout.Column bg="green-200" px py>
              Settings
            </Layout.Column>
          </Layout.Column>
          {/* Main Content */}
          <Layout.Column grow bg="orange-200" px py>
            <Layout.Column px py radius={10} bg="pink-200">
              Title
            </Layout.Column>
            <Spacer.Vertical />
            <Layout.Column px py radius={10} bg="pink-200">
              Photo(s)
            </Layout.Column>
            <Spacer.Vertical />
            <Layout.Column px py radius={10} bg="pink-200">
              Events!!
            </Layout.Column>
          </Layout.Column>
        </Layout.Row>
      </Layout.Column>
    </Layout.Column>
  );
};
