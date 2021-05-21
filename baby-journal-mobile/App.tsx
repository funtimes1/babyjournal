import { StatusBar } from "expo-status-bar";
import React from "react";
import { Layout } from "./src/components/Layout.components";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/theme/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout.Column grow bg="success">
        <StatusBar style="auto" />
      </Layout.Column>
    </ThemeProvider>
  );
}
