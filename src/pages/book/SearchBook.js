import { Box, Grid, Typography, FormGroup, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, IconButton, Slide, Slider, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { userBookService } from "../../services/userBook.services";
import { useEffect } from "react";
import { bookService } from "../../services/books.services";
import BookCard2 from "../../components/book/BookCard2";
import { LinearProgress, Stack, Switch, styled } from "@mui/material";
import { Search } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams, useSearchParams } from "react-router-dom";

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default function SearchBook() {
    const [isLoadingCate, setIsLoadingCate] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([])
    const [sortBy, setSortBy] = useState("Newest")
    const [state, setState] = useState("All")
    const [data, setData] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [searchSent, setSearchSent] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchParams] = useSearchParams();
    const [simple, setSimple] = useState(false)

    const [isSearching, setIsSearching] = useState(false)

    const [range, setRange] = React.useState([0, 1000000]);

    const [mangaList, setMangaList] = useState({
        "total": 81,
        "pageIndex": 1,
        "pageSize": 10,
        "data": []
    })

    const load = async () => {
        setIsLoadingCate(true)
        setIsLoading(true)
        const rs = await userBookService.categories();
        console.log(rs)
        if (rs) {
            setCategories(rs.data)
            setIsLoadingCate(false)
        }
    }

    const { isSimple } = useParams();

    useEffect(() => {
        load()
        if(isSimple){
            setSimple(true)
        }else{
            setSimple(false)
        }
        findBook()
    }, [])

    const findBook = () => {
        setIsSearching(true)
        setPageNumber(1)
        bookService.findBook(1, 12, searchInput, category, state, range[0], range[1], sortBy).then((rs) => {
            setPageNumber(1)
            setData(rs.data.data)
            setIsLoading(false)
            setIsSearching(false)
        })
    }

    const onSearchInputChange = e => {
        setSearchInput(e.target.value)
        if (e.target.value.length === 0) {
            setSearchSent(false)
        }
    }

    const fetchData = () => {
        console.log("Load more", pageNumber + 1)
        bookService.findBook(pageNumber, 12, searchInput, category, state, range[0], range[1], sortBy).then((rs) => {
            console.log("data new", rs.data.data);
            setData(old => old.concat(rs.data.data))
            setPageNumber(pageNumber + 1)
        }).catch(console.error)
    }

    const callBackPrice = (childData) => {
        setRange(childData)
    }

    return (
        <Box sx={{ flexGrow: 1 }} margin={`2em 0`}>
            <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <FormControlLabel
                        control={<Android12Switch onChange={(e) => setSimple(!simple)} checked={simple} />}
                        label="Đơn giản"
                    />
                    {simple === false ?
                        <div style={{ margin: "1em 0" }}>
                            <Typography>Thể loại</Typography>
                            <FormGroup>
                                {isLoadingCate === false ? <div>
                                    {categories.map((cate) => {
                                        return (
                                            <FormControlLabel control={<Checkbox onChange={(e) => {
                                                if (e.target.checked) {
                                                    setCategory(old => [...old, cate.id])
                                                } else {
                                                    setCategory(category.filter(item => item !== cate.id))
                                                }
                                            }} name={cate.id} />}
                                                label={cate.name} sx={{ width: "8em" }} />
                                        )
                                    })}
                                </div> : <></>}
                            </FormGroup>
                        </div>
                        : <></>}
                    <div style={{ margin: "1em 0" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <InputLabel id="demo-simple-select-helper-label">Xắp xếp theo</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={sortBy}
                                    label="Xắp sếp theo"
                                    onChange={(e) => { setSortBy(e.target.value) }}
                                    sx={{ minWidth: "20em" }}
                                >
                                    <MenuItem value={"Newest"}>Cập nhất mới</MenuItem>
                                    <MenuItem value={"HotAll"}>Xem nhiều nhất</MenuItem>
                                    <MenuItem value={"HotDay"}>Xem nhiều nhất hôm nay</MenuItem>
                                    <MenuItem value={"HotWeek"}>Xem nhiều nhất tuần</MenuItem>
                                    <MenuItem value={"HotMonth"}>Xem nhiều nhất tháng</MenuItem>
                                    <MenuItem value={"MostFollow"}>Theo dõi nhiều nhất</MenuItem>
                                    <MenuItem value={"MostComment"}>Bình luận nhiều nhất</MenuItem>
                                    <MenuItem value={"MostChapter"}>Số chapter nhiều</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <InputLabel id="state">Tình trạng</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={state}
                                    label="Xắp sếp theo"
                                    onChange={(e) => { setState(e.target.value) }}
                                    sx={{ minWidth: "20em" }}
                                >
                                    <MenuItem value={"All"}>Tất cả</MenuItem>
                                    <MenuItem value={"Unfinish"}>Chưa hoàn thành</MenuItem>
                                    <MenuItem value={"Finish"}>Đã hoàn thành</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <InputLabel id="state">Giá</InputLabel>
                            </Grid>
                            <Grid item xs={4}>
                                <PriceSlider parentCallback={callBackPrice}></PriceSlider>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                findBook();
                            }}>
                                <input type="text" value={searchInput} onChange={onSearchInputChange} placeholder='Tên sách' className='searchManga' />
                                <IconButton onClick={(e) => { findBook(); }}> <Search></Search> Tìm kiếm</IconButton>
                            </form>
                        </div>
                    </div>
                    <div style={{ margin: "1em 0" }}>
                        {isSearching === false ?
                            <InfiniteScroll
                                dataLength={data.length} //This is important field to render the next data
                                next={fetchData}
                                hasMore={data.length !== mangaList.total}
                                loader={<LinearProgress />}
                            >
                                <Grid container spacing={2}>
                                    {
                                        data.map((item, index) => {
                                            return <Grid item xs={6} sm={4} md={2}>
                                                <BookCard2 key={index} manga={{ name: item.name, id: item.id, image: item.cover, star: item.numOfStar / (item.numOfReview + 1), view: 100 }} />
                                            </Grid>
                                        })
                                    }
                                </Grid>
                            </InfiniteScroll>
                            : <LinearProgress />}
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </Box>
    )
}

function PriceSlider(props) {
    const minmin = 0;
    const maxmax = 1000000;
    const [priceRangeValue, setPriceRangeValue] = useState([0, 1000000]);

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRangeValue(newValue);
        sendData(newValue)
    };

    const sendData = (htmls) => {
        props.parentCallback(htmls);
    }

    return (
        <>
            <Slider
                getAriaLabel={() => "Khoảng giá"}
                value={priceRangeValue}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={minmin}
                max={maxmax}
            />
            <Stack direction="row" justifyContent="space-evenly" alignItems="center">
                <TextField
                    label="Thấp nhất"
                    type="number"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "90px" }}
                    value={priceRangeValue[0]}
                    onChange={(e) => {
                        setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
                    }}
                />
                <Typography>-</Typography>
                <TextField
                    label="Cao nhất"
                    type="number"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "90px" }}
                    value={priceRangeValue[1]}
                    onChange={(e) => {
                        setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
                    }}
                />
            </Stack>
        </>
    );
}