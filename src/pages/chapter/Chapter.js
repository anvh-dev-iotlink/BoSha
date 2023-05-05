import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CommentList from "../../components/CommentList";
import LinearProgress from '@mui/material/LinearProgress';
import ChapterNav from "../../components/ChapterNav";
import { chapterService } from "../../services/chapter.services";
import { useParams } from "react-router-dom";
import { firebaseService } from "../../services/firebase.services";
import { Comment } from "../../components/CommentReviewInput";
import { useNavigate } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";
import { bookService } from "../../services/books.services";

const data = {
    "bookId": "643656848e27bd8b116546e9",
    "chapterId": "643656888e27bd8b116546fa",
    "name": "Tập 17",
    "chapterNumber": 17,
    "created": "2023-04-12T06:58:16.574Z",
    "updated": "2023-04-12T06:58:16.574Z",
    "textLink": "https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656848e27bd8b116546e9%2F643656888e27bd8b116546fa.html?alt=media&token=776995dd-485f-48ed-ac04-8dcff7984a92"
}

const Chapter = () => {
    const { id } = useParams();
    const [chap, setChap] = useState("5")
    const [isLoading, setIsLoading] = useState(true)
    const [chapterDetail, setChapterDetail] = useState(data)
    const [dateUpdate, setDateUpdate] = useState("")
    const [status, setStatus] = useState({
        "buyed": false,
        "liked": false,
        "canEdit": false
      })
    const resultRef = useRef(null);

    let navigate = useNavigate()
    const moment = require('moment');
    moment.updateLocale('vi', {
        relativeTime: {
            future: "%s",
            past: "%s giây trước",
            s: function (number, withoutSuffix, key, isFuture) {
                return '00:' + (number < 10 ? '0' : '')
                    + number + ' phút trước';
            },
            m: "01:00 minutes",
            mm: function (number, withoutSuffix, key, isFuture) {
                return (number < 10 ? '0' : '')
                    + number + ':00' + ' phút trước]';
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

    const setChapText = (data) => {
        setChap(data)
    }

    useEffect(() => {
        console.log(id)
        setIsLoading(true)
        chapterService.chapterDetail(id).then(
            (rs) => {
                console.log(rs.data)
                setChapterDetail(rs.data)
                setChap(rs.data.textLink)
                firebaseService.getChapter(rs.data.bookId, rs.data.chapterId, setChapText)
                const date1 = new Date(chapterDetail.updated);
                let a = moment().from(date1);
                setDateUpdate(a)
                bookService.bookStatus(rs.data.bookId).then((rs) => {
                    console.log(rs)
                    setStatus(rs)
                }).catch(console.error)
                setIsLoading(false)
            }
        ).catch((err) => {
            console.log(err)
            navigate(-1);
        })
    }, [])

    return (
        <Box>
            {isLoading === false ?
                <div style={{margin: "0 2em", textAlign: "center"}}>
                    <Typography>{`${chapterDetail.name}`}</Typography>
                    <Typography>{`${chapterDetail.chapterNumber}: ${chapterDetail.name}`}</Typography>
                    <Typography>{`${chap.replace(/(<([^>]+)>)/ig, '').trim().split(/\s+/).length}, cập nhật ${dateUpdate}`}</Typography>
                    <ChapterNav chapter={{book: chapterDetail.bookId, chap: id}} resultRef={resultRef}></ChapterNav>
                    <div dangerouslySetInnerHTML={{ __html: chap }} ></div>
                </div> :
                <>
                    <LinearProgress />
                </>
            }
            <Comment chap={{ chapId: id }}></Comment>
            <CommentList chap={{ chapId: id }} ref={resultRef}></CommentList>
        </Box>
    )
}

export default Chapter