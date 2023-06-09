import React, { useEffect } from 'react';
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import './../css/SelectMulti.css';
import { userBookService } from '../services/userBook.services';

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

function getStyles(name, category, theme) {
  return {
    fontWeight:
      category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect(props) {
  const theme = useTheme();
  const [category, setcategory] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const load = async () => {
    const rs = await userBookService.categories();
    console.log(rs)
    if(rs){
      setCategories(rs.data)
    }
  }

  useEffect(() => {
    load()
    try{
      if(props.book.categories)
        setcategory(props.book.categories)
    }catch(err){};
  }, []);
  
  const handleChange = (event, key) => {
    const {
      target: { value }
    } = event;
    setcategory(
      typeof value === "string" ? value.split(",") : value
    );
    sendData(typeof value === "string" ? value.split(",") : value)
  };

  const sendData = (category) => {
    props.parentCallback(category);
  }

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
          {categories.map((cate) => (
            <MenuItem
              value={cate.id}
              style={getStyles(cate, categories, theme)}
            >
              {cate.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="category-item-list">
        {category.map((item) => {
          var cateName = ""
          if(categories.find((cate) => cate.id === item)){
            cateName = categories.find((cate) => cate.id === item).name
          }
          return <span className="category-item">{cateName}</span>;
        })}
      </div>
    </div>
  );
}