"use client";
import React, { useEffect, useState } from "react";
import { Data, TableProps } from "../../app/styles/common";
import useFind from "../Hooks/useFind";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TableData = ({ data, dataFiltered }: TableProps) => {
  return (
    <>
      <TableContainer style={{ paddingTop: "25px", placeItems: "center" }}>
        <Table
          aria-label="simple table"
          style={{ width: "fit", border: "1px solid grey" }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
              >
                ID
              </TableCell>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
              >
                Title
              </TableCell>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
              >
                Points
              </TableCell>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
              >
                Comments
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFiltered
              ? dataFiltered.map((row: Data, i: number) => (
                  // {filteredData.map((row: any, i: number) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      width={"w-min"}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {row.number}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={"w-min"}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={"w-min"}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {row.points}{" "}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={"w-min"}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {row.comments}
                    </TableCell>
                  </TableRow>
                ))
              : data &&
                data.map((row: Data, i: number) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      width={"w-min"}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {row.number}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={"w-min"}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={"w-min"}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {row.points}{" "}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={"w-min"}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {row.comments}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TableData;
