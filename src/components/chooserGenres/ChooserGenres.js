import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {moviesActions} from "../../redux/slices";
import css from './Chooser.module.css'


const ChooserGenres = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {selectedGenre} = useSelector(state => state.movies);

    const handleChange = (event) =>{
        const value = event.target.value;
        console.log(value)
        dispatch(moviesActions.setGenre(value));
        navigate(`discoverGenre/${value}`)
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
                <MenuItem value={12}>Adventure</MenuItem>
                <MenuItem value={28}>Action</MenuItem>
                <MenuItem value={16}>Animation</MenuItem>
                <MenuItem value={35}>Comedy</MenuItem>
                <MenuItem value={80}>Crime</MenuItem>
                <MenuItem value={99}>Documentary</MenuItem>
                <MenuItem value={18}>Drama</MenuItem>
                <MenuItem value={10751}>Family</MenuItem>
                <MenuItem value={36}>History</MenuItem>
                <MenuItem value={27}>Horror</MenuItem>
                <MenuItem value={10402}>Music</MenuItem>
                <MenuItem value={9648}>Mystery</MenuItem>
                <MenuItem value={10749}>Romance</MenuItem>
                <MenuItem value={878}>Science Fiction</MenuItem>
                <MenuItem value={10770}>TV Movie</MenuItem>
                <MenuItem value={53}>Thriller</MenuItem>
                <MenuItem value={10752}>War</MenuItem>
                <MenuItem value={37}>Western</MenuItem>
            </Select>
        </FormControl>
        </Box>
    );
};

export {ChooserGenres};