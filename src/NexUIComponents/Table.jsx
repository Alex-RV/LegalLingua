import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function App() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>FROM</TableColumn>
        <TableColumn>STORY</TableColumn>
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
          <TableCell>I got troubles signing my lease...</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Gabe</TableCell>
          <TableCell>🇵🇭</TableCell>
          <TableCell>I still have to translate the Bank letters!</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
