import React from "react";
import {Textarea} from "@nextui-org/react";

export default function App({title, chatText }) {
  return (
    <Textarea
      label= {title}
      labelPlacement="outside"
      placeholder="Enter your description"
      className="border shadow-lg p-3 w-full mt-2"
      value={chatText}
    />
  );
}
