import firebase from "../firebase";
import React, { useState } from "react";
import { x } from "@xstyled/styled-components";
import { daysInWeek, format, getDate, startOfWeek } from "date-fns";
import { eachDayOfInterval, endOfWeek } from "date-fns/esm";

export const Calendar: React.FC = () => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  //how to determine which date is selected if selecting a different date?
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const startWeek = startOfWeek(new Date(selectedDate));
  const endWeek = endOfWeek(new Date(selectedDate));
  const startEndDayDifference = eachDayOfInterval({
    start: new Date(startWeek),
    end: new Date(endWeek),
  });
  console.log(startEndDayDifference[0].getDate());
  console.log(startEndDayDifference);

  console.log(startEndDayDifference[0].getMonth());

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
        {month[startEndDayDifference[0].getMonth()]}
        {/* not sure how to figure out a unique key?? */}
        {startEndDayDifference.map((days, index) => {
          return (
            <x.div key={index} display="flex" flex-direction="row">
              <Circle>{days.getDate()} </Circle>{" "}
            </x.div>
          );
        })}
      </x.div>
    </x.div>
  );
};

// 1. get the current date as default selected date
// 2. find the start and end of the week for that date using date-fns
// 3. using the start and end of the week, get an array of days of that week using date-fns
// 4. map over the array of days which are Date objects render each in a Circle with their
// day of the month number
