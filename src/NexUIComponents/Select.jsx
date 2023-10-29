import React from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {animals} from "./data";

export default function App() {
  return (
    <Select
      items={animals}
      label="Favorite Animal"
      placeholder="Select an animal"
      className="max-w-xs"
    >
      {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
    </Select>
  );
}
