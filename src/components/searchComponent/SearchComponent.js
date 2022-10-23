import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, Pagination, PaginationItem} from "@mui/material";
import {Link, useLocation, useParams} from "react-router-dom";

import css from "../movies/Movies.module.css";
import {MovieForList} from "../movieForList/MovieForList";
import {moviesActions} from "../../redux/slices";



const SearchComponent = () => {

    const location = useLocation();
    const [page, setPage] = useState(+location.search.split('=')[1] || 1);
    const [keyword, setKeyword] = useState('');
    const {request} = useParams();

    const {fromSearch, loading, error, genres} = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (request !== keyword){
            setKeyword(request)
        }
    }, [request, keyword])
    useEffect(() => {
        if(!genres.length){
            dispatch(moviesActions.getAllGenres());
        }
    }, [genres])

    useEffect(()=>{
        if (keyword){
            dispatch(moviesActions.getFromSearch({request: keyword, page: page}));
        }
    }, [page, keyword])


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
                    fromSearch.results ? fromSearch.results.map(movie => <MovieForList key={movie.id} movie={movie}/>) :
                        <h3>Start your searching!</h3>
                }
                {
                    fromSearch.results && !fromSearch.results.length && <h3>Nothing was found!</h3>
                }
            </div>
            {fromSearch.total_pages >=2 && <Container style={{width:'80%', display:'flex', justifyContent: 'center'}}>
                <Pagination
                    count={fromSearch.total_pages}
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

export {SearchComponent};