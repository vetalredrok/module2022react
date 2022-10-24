import React, {Fragment, useEffect, useState} from 'react';
import {Container, Pagination, PaginationItem} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useLocation} from "react-router-dom";

import {Movies} from "../../components";
import {moviesActions} from "../../redux/slices";



const MoviesListPage = () => {

    const location = useLocation();

    const searchParam = +location.search.split('=')[1];

    const [page, setPage] = useState(+location.search.split('=')[1] || 1);

    const {genres} = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!genres.length) {
            dispatch(moviesActions.getAllGenres());
        }
        if(searchParam === 1){
            setPage(1);
        }
    }, [genres, page, searchParam]);


    return (
        <Fragment>
            <Outlet/>
            <Movies page={page}/>
            <Container style={{width:'80%', display:'flex', justifyContent: 'center'}}>
                <Pagination
                    count={500}
                    shape="rounded"
                    page={page}
                    onChange={(_, num) => setPage(num)}
                    renderItem={
                    (item) => (
                        <PaginationItem
                            component={Link}
                            to={`/movies?page=${item.page}`}
                            {...item}
                        />
                    )
                }
                />
            </Container>
        </Fragment>
    );
};

export {MoviesListPage};