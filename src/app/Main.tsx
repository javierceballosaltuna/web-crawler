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
  const [radioChecked, setRadioChecked] =
    useState<dbData["filterApplied"]>(undefined);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // CustomHook to execute GET and scrap data
  const {
    data: rawData,
    error,
    isLoading,
  } = useFind(url, filter ? { filters: filter } : undefined);

  // CustomHook to execute POST and insert Usage data log with {timeStamp, filtersApplied and ipAddress}
  const { data: newData, error: newError } = useInsertUsageData(
    insertUsageURL,
    JSON.stringify(rawData ? rawData[1] : null)
  );
  const RAWDATA = rawData ?? null;

  // Initial useffect that retrieves scrap data
  useEffect(() => {
    if (url && rawData) {
      setUrl("");
    }
    if (!rawData && !url) {
      setUrl("/api/findScrapData");
    }
  }, [url]);
  // Saves scrap data on useState and triggers POST to ddbb to save the log
  useEffect(() => {
    if (rawData) {
      setData(rawData[0]);
      setInsertUsageURL("/api/inserOneUsageLog");
    }
  }, [rawData]);

  // stops executing POST to ddbb saving Usage data
  useEffect(() => {
    if (insertUsageURL) {
      setInsertUsageURL("");
    }
  }, [insertUsageURL]);
  return (
    <>
      <Box>
        <div className="flex justify-between mb-10" data-testid={'Tabs'}>
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
      {tab === 1 && <TableUsageData />}
    </>
  );
};
export default Main;
