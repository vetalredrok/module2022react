import React from 'react';
import {useSelector} from "react-redux";
import StarRatings from "react-star-ratings/build/star-ratings";
import {Badge} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {posterURL} from "../../configs";
import logo from "../../assets/HD-wallpaper-404-background-apple-designer-error-humor-logo-not-found-silly.jpg";
import css from './MovieForList.module.css';




const MovieForList = ({movie}) => {

    const {poster_path, genre_ids, id} = movie;
    const badge = [];

    const {genres} = useSelector(state => state.movies);
    const navigate = useNavigate();

    if (genres.length) {
        for (const argument of genre_ids) {
            const {name} = genres.find(element => element.id === argument);
            badge.push(name)
        }
    }
    return (
        <div className={css.Container}>
            <div className={css.forImage}>
                <Badge badgeContent={`${badge[0] ? ''+badge[0] : ''}${badge[1] ? ', '+badge[1] : ''}`} color='secondary'>
                <img src={`${posterURL}${poster_path}`} alt={movie.title} onError={e => {
                    e.currentTarget.src = logo
                }} className={css.Movie} onClick={()=>navigate(`${id}`)}/>
                    </Badge>
            </div>
            <div className={css.info}>
                <div style={{fontSize: '20px', paddingLeft: '10px', color: 'violet', cursor: 'pointer', textDecoration: 'underline'}} onClick={()=>navigate(`${id}`)}>{movie.title}</div>
                <div style={{maxHeight:'180px', overflowY:"auto"}}>{movie.overview}</div>
                <div>Release date: {movie.release_date}</div>
                <StarRatings
                rating={movie.vote_average}
                starRatedColor="violet"
                numberOfStars={10}
                starDimension="15px"
                />
            </div>
        </div>
    );
};

export {MovieForList};