import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function App() {
  return (
    <Table className="blue-text" aria-label="Story Table">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>From</TableColumn>
        <TableColumn>Story</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Juan</TableCell>
          <TableCell>🇨🇴</TableCell>
          <TableCell>I filled up my visa application wrong and it got delayed 9 months...</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Aleks</TableCell>
          <TableCell>🇷🇺</TableCell>
          <TableCell>I've got troubles signing my lease...</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Gabe</TableCell>
          <TableCell>🇵🇭</TableCell>
          <TableCell>I still have to translate the bank letters!</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Xiang</TableCell>
          <TableCell>🇸🇬</TableCell>
          <TableCell>I don't understand my work contract!</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
