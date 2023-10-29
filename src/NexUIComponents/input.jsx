import React from "react";
import {Input} from "@nextui-org/react";

export default function App() {
  return (
    <Input
      isDisabled
      type="email"
      label="Email"
      defaultValue="junior@nextui.org"
      className="max-w-xs"
    />
  );
}
