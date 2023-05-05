import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from "@mui/material";

export default function RadioPrice(props) {
    const [selectedValue, setSelectedValue] = React.useState("1");
    const [value, setValue] = React.useState(1000);
    const [radioDisabled, setRadioDisabled] = React.useState(false);
   
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue)
    };
    const handlePriceChange = (event) => {
        if(event.target.value <= 1000){
            setValue(1000);
            sendData(1000)
            return;
        }
        setValue(event.target.value);
        sendData(event.target.value)
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: "size-radio-button-demo",
        inputProps: { "aria-label": item },
    });

    const sendData = (htmls) => {
        props.parentCallback(htmls);
    }

    React.useEffect(() => {
        const price = props.book.price
        if(price){
            if(price === 0){
                setSelectedValue("1")
            }else{
                setSelectedValue("2")
                if(price < 1000)
                setValue(1000)
            }
            setRadioDisabled(true)
        }
    }, [])
    return (
        <FormControl fullWidth margin="normal">
            <FormLabel id="demo-radio-buttons-group-label" >Loại truyện</FormLabel>
            <RadioGroup
                disabled={radioDisabled}
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                margin="normal">
                <FormControlLabel
                    value="1"
                    control={<Radio {...controlProps("1")} size="small" />}
                    label="Miễn phí"
                />
                <FormControlLabel
                    value="2"
                    control={
                        <Radio
                            {...controlProps("2")}
                            size="small"
                        />
                    }
                    label="Có phí"
                />
            </RadioGroup>
            {selectedValue == 2 ?
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="outlined-adornment-amount">Giá tiền</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        inputProps={{min: 1000, style: { textAlign: 'right' }}}
                        endAdornment={<InputAdornment position="start">VND</InputAdornment>}
                        label="Giá tiền"
                        onChange={handlePriceChange}
                        type="number"
                        value={value}
                    />
                </FormControl> : <></>
            }
        </FormControl>
    );
}