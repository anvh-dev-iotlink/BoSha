import React, { useEffect, useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";

import { Avatar, Grid, Paper } from "@mui/material";

import "../css/CommentList.css";
import { commentService } from "../services/comment.services";
import { Star, StarBorderOutlined } from "@mui/icons-material";

const moment = require('moment');
moment.updateLocale('vi', {
    relativeTime: {
        future: "%s",
        past: "%s",
        s: "vài giây trước",
        ss: "vài giây trước",
        m: "01 phút trước",
        mm: function (number, withoutSuffix, key, isFuture) {
            return (number < 10 ? '0' : '')
                + number + ' phút trước';
        },
        h: "một giờ trước",
        hh: "%d giờ trước",
        d: "một ngày trước",
        dd: "%d ngày trước",
        M: "một tháng trước",
        MM: "%d tháng trước",
        y: "một năm trước",
        yy: "%d năm trước"
    }
});

const comments = [
    {
        "id": "645117b7b226be32c08b5dd6",
        "userName": "An Văn",
        "userAva": "https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/336360852_998079328269332_2768670379783425409_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=38ZuJXyK0vQAX9RYvLL&_nc_ht=scontent.fdad1-3.fna&oh=00_AfCXNr9EbTsX8oP2I05PTXF9MNHOdExve243Cw2gK5-XkA&oe=64327F57",
        "text": "hay lắm",
        "like": 0,
        "star": 5,
        "creatDate": "2023-05-02T14:01:27.582Z"
    }
]
function ReviewList(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(10);
    const [commentsList, setCommentsList] = useState(comments);

    const id = props.book.bookId
    const handleChange = (e, p) => {
        setPage(p);
    };

    useEffect(() => {
        setIsLoading(true)
        var rs = commentService.getReviewCommentBook(id, page, 10).then((rs) => {
            console.log(rs)
            setCommentsList(rs.data.data)
            setTotal(rs.data.count)
            setIsLoading(false)
        }).catch((err) => { console.log(err) })
    }, [page, props.isLoad])

    return (
        <div style={{ padding: 14 }} className="App">

            {isLoading === false ? <>
                {commentsList.length === 0 ? <h3>Chưa có đánh giá</h3> :
                    <h3>Đánh giá</h3>}
                {commentsList.map((item, index) => (
                    <Paper style={{ padding: "40px 20px", backgroundColor: "#F9F9F9" }}>
                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item>
                                <Avatar alt={item.userName} src={item.userAva} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{item.userName}</h4>
                                <p style={{ textAlign: "left" }}>
                                    {item.text}
                                </p>
                                <div className="comment-bottom">
                                    <span className="comment-icon">
                                        {[...Array(item.star).keys()].map((x) => 
                                            <Star className="icon-star" />
                                        )}
                                    </span>
                                    <p style={{ textAlign: "right", color: "gray" }}>
                                        {
                                            moment().from(new Date(item.creatDate))
                                        }
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
                {total >  10 ?
                    <Pagination count={total / 10 + 1} page={page + 1} sx={{ marginTop: '2em' }} onChange={handleChange} />
                    : <> </>
                }
            </> :
                <CircularProgress></CircularProgress>
            }
        </div>
    );
}

export default ReviewList
