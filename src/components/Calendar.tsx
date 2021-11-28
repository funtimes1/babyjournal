import firebase from "../firebase";
import React, { useState } from "react";
import { x } from "@xstyled/styled-components";
import { daysInWeek, endOfMonth, format, getDate, startOfWeek } from "date-fns";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  startOfMonth,
} from "date-fns/esm";

export const Calendar: React.FC = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const startWeek = startOfWeek(selectedDate);
  const endWeek = endOfWeek(selectedDate);
  const currentWeek = eachDayOfInterval({
    start: startWeek,
    end: endWeek,
  });
  const startMonth = startOfMonth(selectedDate);
  const endMonth = endOfMonth(selectedDate);
  const currentMonth = eachDayOfInterval({
    start: startMonth,
    end: endMonth,
  });

  // we need to get all days related to that month eg. 31st from prev month or 123 for next
  // given the first day of the month, get the start of the week for that day
  // given the last day of the month, get the end of the week for that day

  // const currentMonthWithPaddingDays = eachDayOfInterval...
  console.log(currentWeek[0].getDate());
  console.log(currentWeek);

  console.log(currentWeek[0].getMonth());

  const Circle: React.FC = (props) => {
    const { children } = props;
    return (
      <x.div
        backgroundColor="orange-200"
        h={10}
        w={10}
        border={1}
        borderRadius={20}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </x.div>
    );
  };

  return (
    <x.div backgroundColor="yellow-200">
      <x.div backgroundColor="blue-200" h="300" w="300">
        current month - {format(selectedDate, "MMMM")}
        <x.div className="week" display="flex" flex-direction="row">
          {currentMonth.map((day, index) => {
            const onClick = () => {
              console.log("hello", day);
            };
            {
              /* not sure how to figure out a unique key?? */
            }
            return (
              <x.div
                key={`weekday-${index}`}
                display="flex"
                flex-direction="row"
                onClick={onClick}
              >
                <Circle>{day.getDate()} </Circle>{" "}
              </x.div>
            );
          })}
        </x.div>
      </x.div>
    </x.div>
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
