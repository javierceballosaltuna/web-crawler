"use client";
import React, { useEffect, useState } from "react";
import { dbData } from "../styles/common";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useFindUsageData from "../Hooks/useFindUsageData";

//Function Component rendering USage table with data store on Mongodb
const TableData = () => {
  const [value, setTrue] = useState("");
  const { data: dbData, error, isLoading } = useFindUsageData(value);
  useEffect(() => {
    console.log("entra en useffect");
    if (value && dbData) {
      setTrue("");
    }
    if (!dbData) setTrue("/api/findUsageData");
  }, []);
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
                TimeStamp
              </TableCell>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
              >
                Filter
              </TableCell>
              <TableCell
                align="left"
                style={{
                  borderBottom: "1px solid black",
                  fontWeight: "bold",
                }}
              >
                IP
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dbData &&
              dbData.map((row: dbData, i: number) => (
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
                    {new Date(row.timeStamp)
                      .toISOString()
                      .split(".")[0]
                      .replace("T", " ")}
                  </TableCell>
                  <TableCell
                    align="left"
                    width={"w-min"}
                    style={{ borderBottom: "1px solid black" }}
                  >
                    {row.filterApplied}
                  </TableCell>
                  <TableCell
                    align="left"
                    width={"w-min"}
                    style={{ borderBottom: "1px solid black" }}
                  >
                    hola
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
