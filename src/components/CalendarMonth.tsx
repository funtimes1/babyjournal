import React, { useState } from "react";
import { x } from "@xstyled/styled-components";
import { format } from "date-fns";

export const CalendarMonth: React.FC = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return <x.div>current month - {format(selectedDate, "MMMM")}</x.div>;
};
