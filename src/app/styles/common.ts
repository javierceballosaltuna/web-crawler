
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
    radioChecked?: dbData['filterApplied']
    setRadioChecked: (value: dbData['filterApplied'])=> void
    setDataFiltered: (value: Data[])=> void
    setFilter: (value: '<5words' | '>5words' | "reset")=> void
}

export type dbData = {
    timeStamp: Date,
    filterApplied?: "<5words" | ">5words" | "reset",
    ipAddress: string
}