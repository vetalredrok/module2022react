import React, {useEffect} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {moviesActions} from "../../redux/slices";
import css from './Chooser.module.css'


const ChooserGenres = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {selectedGenre, genres} = useSelector(state => state.movies);

    useEffect(() => {
        if(!genres.length){
            dispatch(moviesActions.getAllGenres());
        }
    }, [genres])

    const handleChange = (event) =>{
        const value = event.target.value;
        dispatch(moviesActions.setGenre(value));
        navigate(`discoverGenre/${value}?page=1`);
    }

    return (
        <Box width={'200px'} className={css.box}>
        <FormControl size={'small'} fullWidth color={'secondary'}>
            <InputLabel color={'secondary'}>Discover by genre</InputLabel>
            <Select
                color={'secondary'}
                value={selectedGenre ? selectedGenre : ''}
                label="Discover by genre"
                onChange={(e)=>{handleChange(e)}}
            >
                {
                    genres.map(genre => <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem> )
                }
            </Select>
        </FormControl>
        </Box>
    );
};

export {ChooserGenres};