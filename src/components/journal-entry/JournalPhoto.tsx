import { format } from "date-fns";
import React from "react";
import { Layout } from "../../theme/Layout.components";
import { useDateStore } from "../useStore";

export const JournalPhoto: React.FC = () => {
  const { selectedDate } = useDateStore();

  return (
    <Layout.Column px py radius={10} bg="pink-200">
      Add photo{" "}
    </Layout.Column>
  );
};
