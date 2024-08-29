"use client";
import { useState, useEffect } from "react";
import Filters from "./Components/Filters";
import TableData from "./Components/Table";
import useFind from "./Hooks/useFind";
import { Data, dbData } from "./styles/common";
import { Box, Tabs, Tab, Button } from "@mui/material";
import TableUsageData from "./Components/TableUsageData";
import useInsertUsageData from "./Hooks/useInsertUsageData";

const Main = () => {
  const [data, setData] = useState<Data[] | undefined>();
  const [insertUsageURL, setInsertUsageURL] = useState("");
  const [filter, setFilter] = useState<"<5words" | ">5words" | "reset">();
  const [dataFiltered, setDataFiltered] = useState<Data[] | undefined>();
  const [url, setUrl] = useState("");
  const [tab, setTab] = useState(0);
  const [radioChecked, setRadioChecked] = useState<dbData['filterApplied']>(undefined)
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const {
    data: rawData,
    error,
    isLoading,
  } = useFind(url, filter ? {filters: filter} : undefined);
  const { data: newData, error: newError } = useInsertUsageData(
    insertUsageURL,
    JSON.stringify(rawData ? rawData[1] : null)
  );
//USEEFFECT INICIAL
  useEffect(() => {
    console.log(url, 'url', rawData, 'rawdata')
    if (url) {
      setUrl("");
    }
    if (!rawData) setUrl("/api/scraping");
  }, [url]);

  useEffect(() => {
    if (rawData) {
        setData(rawData[0]);
      setInsertUsageURL("/api/inserOne");
    }
  }, [rawData]);

  useEffect(() => {
    if (insertUsageURL) {
      setInsertUsageURL("");
    }
  }, [insertUsageURL]);
  return (
    <>
      <Box>
        <div className="flex justify-between mb-10">
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Main Page" />
            <Tab label="Usage Data" />
          </Tabs>
        </div>
      </Box>
      {tab === 0 && (
        <>
          <Filters
            data={data}
            setDataFiltered={setDataFiltered}
            setFilter={setFilter}
            radioChecked={radioChecked}
            setRadioChecked={setRadioChecked}
          />
          {data && <TableData data={data} dataFiltered={dataFiltered} />}
        </>
      )}
      {tab === 1 && (
        // <div
        //   id="container"
        //   className="flex w-[100%] justify-start mt-[100px]"
        // ></div>
        <TableUsageData />
      )}
    </>
  );
};
export default Main;
