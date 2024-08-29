import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FiltersProps } from "../styles/common";


//Function component to render Filter options (as Radiogroup)
const Filters = ({
  radioChecked,
  setRadioChecked,
  setFilter,
}: FiltersProps) => {
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
          onClick={(e: React.SyntheticEvent) => {
            if (e) {
              setRadioChecked(">5words");
              setFilter(">5words");
            }
          }}
          control={<Radio />}
          checked={radioChecked === ">5words" ?? false}
          label=">5 words in title plus ordered by number of comments "
        />
        <FormControlLabel
          value="<5words"
          onClick={(e: React.SyntheticEvent) => {
            if (e) {
              setRadioChecked("<5words");
              setFilter("<5words");
            }
          }}
          control={<Radio />}
          checked={radioChecked === "<5words" ?? false}
          label="<=5 words in title plus ordered by points"
        />
        <FormControlLabel
          value="reset"
          onClick={(e: React.SyntheticEvent) => {
            if (e) {
              setRadioChecked("reset");
              setFilter("reset");
            }
          }}
          control={<Radio />}
          checked={radioChecked === "reset" ?? false}
          label="Clear Filters"
        />
      </RadioGroup>
    </FormControl>
  );
};
export default Filters;
