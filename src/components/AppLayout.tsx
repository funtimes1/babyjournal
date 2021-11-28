import React from "react";
import { x } from "@xstyled/styled-components";
import { NavBar } from "./NavBar";
import { Calendar } from "./Calendar";

export const AppLayout: React.FunctionComponent = () => {
  return (
    <x.div
      display="flex"
      h="100vh"
      flexDirection="column"
      backgroundColor="green-200"
    >
      <NavBar />
      <x.div display="flex" backgroundColor="blue-200" flex="1">
        <Calendar />
        <x.div
          display="flex"
          backgroundColor="green-200"
          flex="1"
          flexDirection="column"
        >
          <x.div backgroundColor="purple-200" h="100">
            title
          </x.div>
          <x.div backgroundColor="red-200" h="300">
            photo
          </x.div>
          <x.div backgroundColor="blue-200" flex="1">
            events
          </x.div>
        </x.div>
      </x.div>
    </x.div>
  );
};
