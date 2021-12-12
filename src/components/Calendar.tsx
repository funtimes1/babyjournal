import React, { useState } from "react";
import { x } from "@xstyled/styled-components";
import {
  addDays,
  daysInWeek,
  endOfMonth,
  format,
  getDate,
  startOfWeek,
} from "date-fns";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  startOfMonth,
} from "date-fns/esm";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarWeeks } from "./CalendarWeeks";
import { Layout } from "../theme/Layout.components";

export const Calendar: React.FC = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  //   console.log(startOfWeek(startMonth));

  // we need to get all days related to that month eg. 31st from prev month or first few days of next month
  // given the first day of the month, get the start of the week for that day
  // given the last day of the month, get the end of the week for that day

  return (
    <Layout.Column bg="yellow-200" size={400}>
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {/* clicked date pass down similarly to below as setSelectedDate*/}
      <CalendarWeeks selectedDate={selectedDate} />
    </Layout.Column>
  );
};

// 1. get the current date as default selected date
// 2. find the start and end of the week for that date using date-fns
// 3. using the start and end of the week, get an array of days of that week using date-fns
// 4. map over the array of days which are Date objects render each in a Circle with their
// day of the month number
// next time - use above info to start to sort out how to show ALL the dates in the month

//Questions:
//right track overall?
//how to determine which date is selected if selecting a different date?
// answer: each of the little circles on the calendar will somehow be associated with a Date object, so when you click on the circle eg (24th), you can call setSelectedDate with the associated Date object from that circle
//show dates rest of the month, how?
//to create layout first of calendar? month header, day of week, etc?
