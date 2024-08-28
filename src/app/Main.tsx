'use client'
import { useState, useEffect } from "react";
import Filters from "./Components/Filters"
import TableData from "./Components/Table"
import useFind from "./Hooks/useFind";
import { Data } from "./styles/common";

const Main = () => {
    const [datos, setData] = useState<Data[] | undefined>();
    const [dataFiltered, setDataFiltered] = useState<Data[] | undefined>()
    const [url, setUrl] = useState("");
    const { data, error, isLoading } = useFind(url);
  console.log(dataFiltered)
    useEffect(() => {
      if (url && data) {
        setUrl("");
      }
      if (!data) setUrl("/api/scraping");
    }, []);
  
    useEffect(() => {
      if (!datos) {
        setData(data);
      }
    }, [data]);
    return (
        <>
        <Filters data={datos} setDataFiltered={setDataFiltered}/>
        {datos && <TableData data={datos} dataFiltered={dataFiltered}/>}
        </>
    )
}
export default Main