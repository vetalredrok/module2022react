import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';

import {moviesActions} from "../../redux/slices";
import {Movie} from "../movie/Movie";
import css from './RawForTop.module.css';

const RawForTop = ({page}) => {

    const {topRated, loading, error} = useSelector(state => state.movies);
    const dispatch = useDispatch();

    const slideLeft = () =>{
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = ()=>{
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    useEffect(() => {
        dispatch(moviesActions.getTopRated({page}))
    }, [page]);

    return (
        <div className={css.parent}>
            {
                error && <div>{error}</div>
            }
            {
                loading && <div>Loading........</div>
            }
            <h2>Top rated:</h2>
            <div className={css.son}>
                <MdChevronLeft onClick={slideLeft} size={80} style={{'cursor': 'pointer'}}/>
                <div className={css.RawForTop} id={'slider'}>
                    {
                        topRated.map(movie => <Movie key={movie.id} movie={movie}/>)
                    }
                </div>
                <MdChevronRight onClick={slideRight} size={80} style={{'cursor': 'pointer'}}/>
            </div>

        </div>
    );
};

export {RawForTop};