import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, Pagination} from '@mui/material';
import {Outlet} from "react-router-dom";

import {RawForGenres, RawForTop} from "../../components";
import {moviesActions} from "../../redux/slices";


const HomePage = () => {

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const {genres,resultRandom} = useSelector(state => state.movies);

    useEffect(()=>{
        if(!genres.length){
            dispatch(moviesActions.getAllGenres());
        }
        if(genres.length && !resultRandom.length){
            const genresForRandom = [...genres];
            const result = genresForRandom.sort(()=> Math.random() - Math.random()).slice(0,5);
            dispatch(moviesActions.setResultRandom(result));
        }
    },[genres, resultRandom])

    return (
        <Fragment>
            <Outlet/>
            <RawForTop page={page}/>
            { resultRandom.length &&  <Fragment>
            <RawForGenres genre={resultRandom[0].id} page={page} title={resultRandom[0].name}/>
            <RawForGenres genre={resultRandom[1].id} page={page} title={resultRandom[1].name}/>
            <RawForGenres genre={resultRandom[2].id} page={page} title={resultRandom[2].name}/>
            <RawForGenres genre={resultRandom[3].id} page={page} title={resultRandom[3].name}/>
            <RawForGenres genre={resultRandom[4].id} page={page} title={resultRandom[4].name}/>

            <Container style={{width:'80%', display:'flex', justifyContent: 'center'}}>
                <Pagination
                count={500}
                shape="rounded"
                page={page}
                onChange={(_, num) => setPage(num)}
                />
            </Container>
            </Fragment>}
        </Fragment>

    );
};

export {HomePage};