import React from "react";
import { x } from "@xstyled/styled-components";
import { NavBar } from "./NavBar";
export const AppLayout: React.FunctionComponent = () => {
  return (
    <x.div
      display="flex"
      h="100vh"
      flexDirection="column"
      backgroundColor="green-200"
    >
      <x.div backgroundColor="red-200" h="20" position="relative">
        <NavBar />
      </x.div>
      <x.div display="flex" backgroundColor="blue-200" flex="1">
        <x.div backgroundColor="yellow-200">
          <x.div backgroundColor="blue-200" h="300" w="300">
            calendar
          </x.div>
        </x.div>
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
