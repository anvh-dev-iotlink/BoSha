import React, { useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Grid, Box, Typography, TextField, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material'
import ListChapter from "../../components/ListChapter";
import CommentList from "../../components/CommentList";
import BookInfo from "../../components/BookInfo";
import BottomInfo from "../../components/BottomInfo";

export default function BookDetail() {
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                    <Grid item xs={10}>
                        <div className='container'>
                            <div className='container-header'>
                                <Typography variant='h5'> Thêm truyện mới </Typography>
                            </div>
                            <div className='container-body'>
                                <Grid container spacing={2}>
                                    <Grid item md={3} sm={12}>
                                        <Box mt={2} textAlign="left">
                                            <img src='https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/341263434_237177232146883_4137101451342149163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oVBrUKg6yQAAX_9mUZ9&_nc_ht=scontent.fdad1-2.fna&oh=00_AfAJzvX02tdE1Ou2rQIg-OZ_oHkpF51x_iim68782kYIQg&oe=6440F313' alt='Default img' width="100%" />
                                        </Box>
                                    </Grid>
                                    <Grid item md={9} sm={12} width="100%">
                                        <div style={{ marginTop: 2 + 'em' }}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Required"
                                                defaultValue="Em tòn qua nhà trai"
                                                className='input-text'
                                            />
                                        </div>
                                        {/* <MultipleSelect></MultipleSelect> */}
                                        <div sx={{ marginTop: '4px' }}>
                                            {/* <RadioPrice></RadioPrice> */}
                                        </div>
                                        <BookInfo></BookInfo>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className='container-bottom'>
                                <BottomInfo></BottomInfo>
                            </div>
                        </div>

                        <div className='container'>
                            <div className='container-header'>
                                <Typography variant='h6'> Danh sách tập </Typography>
                            </div>
                            <div className='container-body'>
                                <ListChapter></ListChapter>
                            </div>
                        </div>
                        <div>
                            <CommentList></CommentList>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        {/* <div>xs=2</div> */}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}