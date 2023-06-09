import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { buyBookService } from '../../services/buybook.services';
import { Box, Button, Grid, IconButton, LinearProgress, Typography } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import { ArrowBack } from '@mui/icons-material';

const VnpayStatus = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = React.useState(true)
    const [rs, setRs] = useState("")
    const [retry_count, setRetryCount] = useState(0);
    const [bookId, setBookId] = useState("")

    let navigate = useNavigate()
    useEffect(() => {
        setIsLoading(true)
        const buyId = searchParams.get('vnp_TxnRef')
        console.log("BuyId", buyId)
        buyBookService.getBuyBookStatus(buyId).then((rs) => {
            if(rs.data.bookId){
                setBookId(rs.data.bookId)
            }
            console.log(rs)
            if (rs.data.status === "Suscess") {
                setRs("Thành công")
                NotificationManager.success("Thanh toán thành công", "Giao dịch thành công", 2000)
                setIsLoading(false)
                setTimeout(() => {
                    console.log("Payment ok")
                }, 2000)
                // navigate("/book/" + rs.data.bookId)
            } else if (rs.data.status === "Faild") {
                setRs("Thất bại")
                NotificationManager.error("Thanh toán không thành công", "Giao dịch không thành công", 2000)
                setIsLoading(false)
                setTimeout(() => {
                    console.log("Payment notOk")
                }, 2000)
                // navigate("/book/" + rs.data.bookId)
            } else {
                setTimeout(() => {
                    setRetryCount(retry_count + 1)
                    setIsLoading(true)
                }, 5000)

            }
        }).catch((e) => {
            console.log("Loi roi", e)
            NotificationManager.error("Có lỗi trong quá trình kiểm tra giao dịch", "Giao dịch không thành công", 2000)
            setIsLoading(false)
            // navigate("/")
        })
    }, [retry_count]);

    return (
        <Box marginTop={"3em"}>
            <Grid container spacing={2}>
                <Grid xs={2}></Grid>
                <Grid xs={8}>
                    {isLoading === false ? <>
                        {rs === "Thành công" ?
                            <Alert severity="success" sx={{ fontSize: '1.5rem', padding: "1rem" }}>
                                <AlertTitle sx={{ fontSize: '2rem' }}><strong>Thanh toán thành công</strong></AlertTitle>
                                Hãy quay lại ứng dụng!
                            </Alert>
                            : <Alert severity="error" sx={{ fontSize: '1.5rem', padding: "1rem" }}>
                                <AlertTitle sx={{ fontSize: '2rem' }}><strong>Thanh toán thất bại</strong></AlertTitle>
                                Hãy quay lại ứng dụng!
                            </Alert>}
                            <IconButton
                            onClick={() => {
                                if(bookId === ""){
                                    navigate("/")
                                }else {
                                    navigate("/book/" + bookId)
                                }
                            }}
                            sx={{ color: "#4F709C"}}>
                                <ArrowBack/>
                                    Trở về trang truyện
                                </IconButton>
                    </>
                        : <div>                    
                            <Typography variant='h5'>Đang kiểm tra tình trạng thanh toán, hãy chờ trong giây lát!</Typography>
                            <LinearProgress />
                        </div>}
                </Grid>
                <Grid xs={2}></Grid>
            </Grid>
        </Box>
    )
}

export default VnpayStatus