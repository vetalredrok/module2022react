import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {moviesActions} from "../../redux/slices";
import {Link, useLocation, useParams} from "react-router-dom";

import css from './DiscoverByGenreComponent.module.css'
import {MovieForList} from "../movieForList/MovieForList";
import {Container, Pagination, PaginationItem} from "@mui/material";

const DiscoverByGenreComponent = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const [page, setPage] = useState(+location.search.split('=')[1] || 1);
    const [keyword, setKeyword] = useState('');
    const {selectedGenre, withGenre, loading, error, genres} = useSelector(state => state.movies)
    const {genre} = useParams();

    useEffect(()=>{
        if (genre !== keyword){
            setKeyword(genre)
        }
    }, [genre, keyword])

    useEffect(() => {
        if(!genres.length){
            dispatch(moviesActions.getAllGenres());
        }
    }, [genres])


    useEffect(()=>{
        if (genre){
            console.log('ти тут')
            dispatch(moviesActions.discoverByGenre({genre: genre, page}))
        }
    }, [page,selectedGenre])

    return (
        <Fragment>

        <div className={css.Container}>
            {
                error && <div>{error}</div>
            }
            {
                loading && <h3>Loading...</h3>
            }
            {
                withGenre.results && !withGenre.results.length && <h3>Nothing was found!</h3>
            }
            {
                withGenre.results && withGenre.results.map(movie => <MovieForList key={movie.id} movie={movie}/>)
            }
        </div>
            {withGenre.total_pages >=2 && <Container style={{width:'80%', display:'flex', justifyContent: 'center'}}>
                <Pagination
                    count={withGenre.total_pages > 500 ? 500 : withGenre.total_pages}
                    shape="rounded"
                    page={page}
                    onChange={(_, num) => setPage(num)}
                    renderItem={
                        (item)=>(
                            <PaginationItem
                                component={Link}
                                to={`?page=${item.page}`}
                                {...item}
                            />
                        )
                    }
                />
            </Container>}

        </Fragment>
    );
};

export {DiscoverByGenreComponent};