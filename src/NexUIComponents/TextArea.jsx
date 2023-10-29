import React from "react";
import { Textarea } from "@nextui-org/react";

export default function App({ title, chatText }) {
  const maxRows = 36;

  return (
    <Textarea
      label={title}
      labelPlacement="outside"
      placeholder="Text will appear here"
      className="border shadow-lg p-3 w-full mt-2 larger-textarea"
      value={chatText}
      maxRows={maxRows}
      style={{ fontSize: '22px', overflowY: 'auto' }}
    />
  );
}
