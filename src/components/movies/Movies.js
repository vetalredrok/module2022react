import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {moviesActions} from "../../redux/slices";
import {MovieForList} from "../movieForList/MovieForList";
import css from './Movies.module.css';

const Movies = ({page}) => {

    const {forAll, loading, error} = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(moviesActions.getFromAll({page}));
    }, [page]);


    return (
        <div className={css.Container}>
            {
                error && <div>{error}</div>
            }
            {
                loading && <h3>Loading...</h3>
            }
            {
                forAll.map(movie => <MovieForList key={movie.id} movie={movie}/>)
            }
        </div>
    );
};

export {Movies};