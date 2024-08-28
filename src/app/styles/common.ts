export type Data = {
    number: number,
    title?: string;
    points?: number;
    comments?: number;
  };
 export type TableProps = {
    data?: Data[],
    dataFiltered?: Data[]
}
export type FiltersProps = {
    data?: Data[],
    setDataFiltered: (value: Data[])=> void
}