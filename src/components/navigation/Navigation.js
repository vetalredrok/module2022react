import React, {Fragment, useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {useDispatch} from "react-redux";

import {useAuth} from "../../hooks";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {userActions} from "../../redux/slices";

const Navigation = () => {

    const auth = getAuth();

    const {email, isAuth, displayName} = useAuth();
    const dispatch = useDispatch();

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
            <div>
                <Link className={'logo-container'} to='/'>
                    <CrownLogo className={'logo'}/>
                </Link>
                {
                    displayName && <h4>{displayName}</h4>
                }
                <div>
                    {
                        isAuth ? <span>Sign Out</span> : <Link to={'/auth'}>Sign in</Link>
                    }
                    <hr/>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    );
};

export {Navigation};