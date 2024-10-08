"use client";
import React from "react";
import { Data, TableProps } from "../../app/styles/common";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//Function Component rendering Main table with Scrap data
const TableData = ({ data, dataFiltered }: TableProps) => {
  return (
    <>
      <TableContainer style={{ paddingTop: "25px", placeItems: "center" }} >
        <Table
          aria-label="simple table"
          style={{ width: "fit", border: "1px solid grey" }}
          data-testid={'main-data-table'}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
                data-testid={'number-col'}
              >
                ID
              </TableCell>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
                data-testid={'title-col'}
              >
                Title
              </TableCell>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
                data-testid={'points-col'}
              >
                Points
              </TableCell>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
                data-testid={'comments-col'}
              >
                Comments
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFiltered
              ? dataFiltered.map((row: Data, i: number) => (          
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
