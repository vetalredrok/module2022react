import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";

import {moviesActions} from "../../redux/slices";
import css from "./RawForGenres.module.css";
import {Movie} from "../movie/Movie";

const RawForGenres = ({genre, page, title}) => {

    const {barFirst, error} = useSelector(state => state.movies);

    console.log(barFirst);

    const dispatch = useDispatch();

    const slideLeft = () =>{
        let slider = document.getElementById(`${genre}`);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = ()=>{
        let slider = document.getElementById(`${genre}`);
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    useEffect(() => {
        if(barFirst.length){
            dispatch(moviesActions.deleteFromRow());
        }
        dispatch(moviesActions.getByGenre({genre,page}))
    }, [page])

    const index = barFirst.findIndex(value => value.id === genre);
    console.log(index);

    return (
        <div className={css.parent}>
            {
                error && <div>{error}</div>
            }
            <h3>{title}</h3>
            <div className={css.son}>
                <MdChevronLeft onClick={slideLeft} size={60} style={{'cursor': 'pointer'}}/>
                <div className={css.RawForTop} id={`${genre}`}>
                    {
                      index>=0?  barFirst[index].results.map(movie => <Movie key={movie.id} movie={movie}/>)
                          :
                          <div>Loading....</div>
                    }
                </div>
                <MdChevronRight onClick={slideRight} size={60} style={{'cursor': 'pointer'}}/>
            </div>

        </div>
    );
};
export {RawForGenres};