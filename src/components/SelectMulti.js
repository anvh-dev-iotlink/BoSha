import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import './../css/SelectMulti.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

function getStyles(name, category, theme) {
  return {
    fontWeight:
      category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect() {
  const theme = useTheme();
  const [category, setcategory] = React.useState([])

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setcategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ mt: `2em`, width: 1 }}>
        <InputLabel id="demo-multiple-name-label">Thể loại</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={category}
          onChange={handleChange}
          label="Thể loại"
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, category, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="category-item-list">
        {category.map((item) => {
          return <span className="category-item">{item}</span>;
        })}
      </div>
    </div>
  );
}