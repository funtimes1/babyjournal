import React, { useState } from "react";
import { addMonths, subMonths, format, startOfMonth } from "date-fns";
import { useDateStore } from "../useStore";
import { Layout } from "../../theme/Layout.components";

export const CalendarHeader: React.FC = () => {
  const { selectedDate, setSelectedDate } = useDateStore();
  const startMonth = startOfMonth(selectedDate);

  const onNextMonthClick = () => {
    const nextMonth = addMonths(new Date(startMonth), 1);
    setSelectedDate(nextMonth);
  };

  const onPrevMonthClick = () => {
    const prevMonth = subMonths(new Date(startMonth), 1);
    setSelectedDate(prevMonth);
  };
  return (
    <Layout.Row center>
      <Layout.Column onClick={onPrevMonthClick} px py>
        prev month
      </Layout.Column>{" "}
      <Layout.Column px py>
        {format(selectedDate, "MMMM yyyy")}
      </Layout.Column>{" "}
      <Layout.Column px py center onClick={onNextMonthClick}>
        next month{" "}
      </Layout.Column>
    </Layout.Row>
  );
};
