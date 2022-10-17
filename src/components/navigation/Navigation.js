import React, {Fragment, useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import {getAuth,signOut} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";

import {useAuth} from "../../hooks";
import {ReactComponent as CrownLogo} from '../../assets/wolf-david.svg'
import {userActions} from "../../redux/slices";
import css from './Navigation.module.css'
import {moviesService} from "../../services";

const Navigation = () => {

    const auth = getAuth();

    const[movie, setMovie] = useState(null)


    const signOutUser = async () => {
        await signOut(auth);
        dispatch(userActions.removeUser());
        console.log('logged out');
    };

    const {isAuth, displayName} = useAuth();
    const dispatch = useDispatch();

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
    }, [])

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
    }, [])


    return (
        <Fragment>
            <div className={css.Navigation}
                     style={{
                         backgroundSize: 'cover',
                         backgroundImage: `${movie ? `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` : ''}` ,
                         backgroundPosition: 'center center'
                     }}>
                    <Link className={'logo-container'} to='/'>
                        <CrownLogo className={'logo'}/>
                    </Link>
                    <div className={css.nav_links_container}>
                        {
                            displayName && <h4 className={css.name}>{displayName}</h4>
                        }
                        {
                            isAuth ? <span className={css.nav_link2} onClick={signOutUser}>Sign Out</span>
                                :
                                <Link className={css.nav_link} to={'/auth'}>Sign in</Link>
                        }
                    </div>
                </div>
            <hr/>
            <Outlet/>
        </Fragment>
    );
};

export {Navigation};