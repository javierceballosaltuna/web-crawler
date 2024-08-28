import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FiltersProps } from "../styles/common";

const Filters = ({ data, setDataFiltered }: FiltersProps) => {
  //AQUI SE FILTRA TODA LA DATA Y SE DEVUELVE A MAIN LA FILTRADA PARA QUE ALIMENTE A TABLE
  let dataFiltered = data;

  const filter = async (filterSelected: string) => {
    if (filterSelected === ">5words") {
      const strRegex = "[^A-Za-z0-9]";

      dataFiltered = dataFiltered?.filter((elm, i) => {
        return elm.title ? elm.title.split(" ").length > 5 : false;
      });
      dataFiltered = dataFiltered?.sort((a, b) => {
        const aComments: number = a.comments ?? 0;
        const bComments: number = b.comments ?? 0;
        if (aComments < bComments) {
          return +1;
        }
        if (aComments > bComments) {
          return -1;
        }

        return 0;
      });
    }
    if (filterSelected === "<5words") {
    //   const strRegex = "[^A-Za-z0-9]";

      dataFiltered = dataFiltered?.filter((elm, i) => {
        return elm.title ? elm.title.split(" ").length <= 5 : false;
      });
      dataFiltered = dataFiltered?.sort((a, b) => {
        const aPoints: number = a.points ?? 0;
        const bPoints: number = b.points ?? 0;
        if (aPoints < bPoints) {
          return +1;
        }
        if (aPoints > bPoints) {
          return -1;
        }

        return 0;
      });
    }
    if (filterSelected === "reset") dataFiltered = data;

    if (dataFiltered) setDataFiltered(dataFiltered);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Filter by:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value=">5words"
          onClick={(e: any) => {
            if (e) filter(">5words");
          }}
          control={<Radio />}
          label=">5 words in title plus ordered by number of comments "
        />
        <FormControlLabel
          value="<5words"
          onClick={(e: any) => {
            if (e) filter("<5words");
          }}
          control={<Radio />}
          label="<=5 words in title plus ordered by points"
        />
        <FormControlLabel
          value="<reset"
          onClick={(e: any) => {
            if (e) filter("<reset");
          }}
          control={<Radio />}
          label="Reset"
        />
      </RadioGroup>
    </FormControl>
  );
};
export default Filters;
