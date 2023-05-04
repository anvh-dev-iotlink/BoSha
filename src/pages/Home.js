import React, { useEffect, useState } from 'react'
import {
  NavLink,
  Link,
  useNavigate
} from "react-router-dom";
import EditorImage from '../components/editor/editor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BorderAll } from '@mui/icons-material';
import { Grid } from '@mui/material';
import BookCard2 from '../components/book/BookCard2'
import RecentlyBookCard from '../components/RecentlyBookCard';
import "../css/home.css";
import CircularProgress from '@mui/material/CircularProgress';
import { userBookService } from '../services/userBook.services';
import { bookService } from '../services/books.services';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [mangaList, setMangaList] = useState({
    "total": 81,
    "pageIndex": 1,
    "pageSize": 10,
    "data": []
  })
  const [data, setData] = useState([])
  const [dataHot, setDataHot] = useState([])

  useEffect(() => {
    const load = async () => {
      if (!pageNumber) {
        pageNumber = 1
      }
      const rs = bookService.booksNew(pageNumber, 12, "Name", "fghdf").then((rs) => {
        console.log(rs.data)
        setMangaList(rs.data)
        setData(rs.data.data)
      }).catch(console.error)

      bookService.booksHotWeek(pageNumber, 12, "Name", "fghdf").then((rs) => {
        console.log(rs.data.data)
        setDataHot(rs.data.data)
        setIsLoading(false)
      })
    }

    setIsLoading(true)
    load().catch(console.error)
  }, [])

  const [searchParams, setSearchParams] = useSearchParams();
  let pageNumber = searchParams.get("pageNumber")


  return (
    <>
      <div className='container m-0 p-0' style={{ width: `100%`, border: `0px` }}>
        <div className='row no-gutter'>
          <div className='col-1'></div>
          <div className='col-2' style={{ paddingRight: `4px`, flex: `1` }}>
            <div className='row no-gutter container-book' style={{ height: `100%`, padding: `8px 0` }}>
              <div>
                <h1 className='title' style={{ textAlign: 'left', fontSize: `18px` }}>ĐỌC GẦN ĐÂY</h1>
              </div>
              <div>
                <div className='row no-gutter'>
                  <RecentlyBookCard></RecentlyBookCard>
                </div>
                <div className='row no-gutter'>
                  <RecentlyBookCard></RecentlyBookCard>
                </div>
                <div className='row no-gutter'>
                  <RecentlyBookCard></RecentlyBookCard>
                </div>
              </div>
            </div>
          </div>
          <div className='col-8' style={{ paddingLeft: `4px` }}>
            <div className='row no-gutter container-book' style={{ height: `100%`, padding: `8px 0` }}>
              <div>
                <h1 className='title' style={{ textAlign: 'left', fontSize: `18px` }}>TRUYỆN HOT</h1>
              </div>
              <div className='row no-gutter' style={{flexWrap: `nowrap`, overflowX: `scroll`}}>
              {
                isLoading === false ? dataHot.map((item, index) => {
                  return <div className='col-lg-2 col-md-2 container-book__padding'>
                    <BookCard2 key={index} manga={{ name: item.name, id: item.id, image: item.cover, star: item.numOfStar / (item.numOfReview + 1), view: 100 }} />
                  </div>
                }) : <CircularProgress/>
              }
              </div>
            </div>
          </div>
          <div className='col-1'></div>
        </div>

        <div className='row no-gutter'>
          <div className='col-1'></div>
          <div className='col-10' style={{ marginRight: 0 }}>
            <div className='row no-gutter d-flex flex-row'>
              <h1 className='title' style={{ textAlign: 'left' }}>TRUYỆN MỚI NHẤT</h1>
            </div>
            <div>
              <Grid container spacing={2}>
              {
                isLoading === false ? data.map((item, index) => {
                  return <Grid item xs={6} sm={4} md={2}>
                    <BookCard2 key={index} manga={{ name: item.name, id: item.id, image: item.cover, star: item.numOfStar / (item.numOfReview + 1), view: 100 }} />
                  </Grid>
                }) : <CircularProgress/>
              }
              </Grid>
            </div>
          </div>
          <div className='col-1'></div>
        </div>
      </div>
    </>

  )
}

export default Home
