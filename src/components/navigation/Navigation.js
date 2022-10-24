import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {getAuth,signOut} from "firebase/auth";
import {useDispatch} from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import {Button} from "@mui/material";
import {useForm} from "react-hook-form";
import {ChooserGenres} from "../chooserGenres/ChooserGenres";

import {useAuth} from "../../hooks";
import {ReactComponent as CrownLogo} from '../../assets/smace films.svg';
import {userActions} from "../../redux/slices";
import {moviesService} from "../../services";
import {DarkModeContext} from "../../context";
import css from './Navigation.module.css';

const Navigation = () => {

    const auth = getAuth();
    const {handleSubmit, register} = useForm();
    const [movie, setMovie] = useState(null);
    const {isAuth, displayName} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useContext(DarkModeContext);


    const signOutUser = async () => {
        await signOut(auth);
        dispatch(userActions.removeUser());
        console.log('logged out');
    };

    useEffect(()=> {
        async function fetchData(){
            const request = await moviesService.getTopRated(1);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                    ]
            );
            return request;
        }
        fetchData();
    }, []);

    useEffect(() => {
        const onChange = (current) =>{
            if(current){
                dispatch(userActions.setUser({
                    email: current.email,
                    id: current.uid,
                    token: current.accessToken,
                    displayName: current.displayName
                }))
            }
        };

        const onError = (error) => {
            console.log(error)
        };

        return auth.onAuthStateChanged(onChange, onError);
    }, []);

    const onSubmit = (data) => {
        navigate(`/search/${data.movieName}`);
    }

    return (
        <Fragment>
            <div className={css.Navigation}
                     style={{
                         backgroundSize: 'cover',
                         backgroundImage: `${movie ? `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` : ''}` ,
                         backgroundPosition: 'center center'
                     }}>
                    <Link className={css.logo_container} to='/home'>
                        <CrownLogo className={css.logo}/>
                    </Link>
                    <NavLink to={'/movies?page=1'}>
                        <div className={css.moviesList}>Movies List</div>
                    </NavLink>
                    <div className={css.box}>
                        <form className={css.searchBox} onSubmit={handleSubmit(onSubmit)}>
                            <SearchIcon className={css.searchIcon} />
                            <input type={'text'} className={css.searchInput} placeholder={'Search movie'} {...register('movieName')}/>
                            <Button variant="outlined" type={'submit'} color={'secondary'}>SEARCH</Button>
                        </form>
                    </div>

                    <ChooserGenres/>

                    <Button sx={{backgroundColor: 'black'}} color={'secondary'} onClick={()=> setDarkMode(!darkMode)}>Dark mode</Button>
                <Button sx={{backgroundColor: 'black'}} color={'secondary'} onClick={()=> navigate('info')}>Info page</Button>
                    <div className={css.nav_links_container}>
                        {
                            displayName && <div className={css.name}>{displayName}</div>
                        }
                        {
                            isAuth ? <span className={css.nav_link2} onClick={signOutUser}>Sign Out</span>
                                :
                                <Link className={css.nav_link} to={'/auth'}>Sign in</Link>
                        }
                    </div>
                </div>
            <hr/>
        </Fragment>
    );
};

export {Navigation};