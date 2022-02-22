import React, { useState } from "react";
import { Layout, Text } from "../theme/Layout.components";
import { eachDayOfInterval, format, getWeek } from "date-fns";

export const CalendarDaysOfWeek: React.FC = () => {
  const result = eachDayOfInterval({
    start: new Date(2022, 0, 16),
    end: new Date(2022, 0, 22),
  });
  const daysOfWeek = result.map((day, index) => {
    // console.log("result", format(new Date(day), "EEEEE"));
    return (
      <Text key={`daysOfWeek-${index}`} style={{ fontWeight: "bold" }}>
        {format(new Date(day), "EEEEE")}
      </Text>
    );
  });
  return (
    <Layout.Row justify="space-around" py={4}>
      {daysOfWeek}
    </Layout.Row>
  );
};
