import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../css/RecentlyBookCard.css";

const RecentlyBookCard = (props) => {

    return (
        <>
            <div class="recently-bookcard-group">
                <Link className="recently-bookcard-group__container">
                    <img className="recently-bookcard-group__img" src='https://s199.imacdn.com/tt24/2020/05/13/34d6d47a9a9b1549_e63854c61da6231c_514181589331148745957.jpg'></img>
                    <div className="recently-bookcard-group__info">
                        <div className="recently-bookcard-group__info-name">
                            I luv u pặc pặc
                        </div>
                        <div className="recently-bookcard-group__info-chapter">
                            Đọc tiếp Chapter 35 
                        </div>
                    </div>
                </Link>
            </div >
        </>
    );
}

export default RecentlyBookCard;