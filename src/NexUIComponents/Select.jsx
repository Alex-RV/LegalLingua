import React from "react";
import {Select, SelectItem} from "@nextui-org/react";

export default function App(collection) {
  return (
    <Select
      items={collection}
      label="Favorite Animal"
      placeholder="Select an animal"
      className="max-w-xs"
    >
      {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
    </Select>
  );
}
