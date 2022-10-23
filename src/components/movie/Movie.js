import React, {Fragment} from 'react';
import {useNavigate} from "react-router-dom";

import {posterURL} from "../../configs";
import css from './Movie.module.css';
import logo from '../../assets/HD-wallpaper-404-background-apple-designer-error-humor-logo-not-found-silly.jpg';

const Movie = ({movie}) => {

    const {poster_path, id} = movie;
    const navigate = useNavigate();



//${posterURL}${poster_path}
    return (
        <Fragment>
            <img src={`${posterURL}${poster_path}`} alt={movie.title} onError={e => {
                e.currentTarget.src = logo
            }} className={css.Movie} onClick={()=>navigate(`${id}`)}/>
            <div className={css.small_info}>
                <p>{movie.title}</p>
                <p>Rating:{movie.vote_average}</p>
            </div>
        </Fragment>
    );
};

export {Movie};