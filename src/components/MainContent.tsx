import React, { useState } from "react";
import { Layout, Spacer } from "../theme/Layout.components";
import { useDateStore } from "./useStore";

export const MainContent: React.FC = () => {
  const { selectedDate } = useDateStore();
  return (
    <Layout.Column>
      <Layout.Column px py radius={10} bg="pink-200">
        Title - {`${selectedDate}`}
      </Layout.Column>
      <Spacer.Vertical />
      <Layout.Column px py radius={10} bg="pink-200">
        Photo(s)
      </Layout.Column>
      <Spacer.Vertical />
      <Layout.Column px py radius={10} bg="pink-200">
        Events!!!!
      </Layout.Column>
    </Layout.Column>
  );
};
