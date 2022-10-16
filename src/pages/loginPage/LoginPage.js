import React from 'react';
import {useDispatch} from "react-redux";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

import {useForm} from "react-hook-form";
import {userActions} from "../../redux/slices";

const LoginPage = () => {

    let dispatch = useDispatch();

    const {handleSubmit, register, reset} = useForm();

    const handleLogin = async (data) => {
        console.log(data);
        const {email, password} = data;

        const auth = getAuth();
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            dispatch(userActions.setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                displayName: user.displayName
            }))
            reset();
        } catch (e) {
            console.log(e.message);
            console.log(e.code);
            console.log(e);
        }


    }
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
        <input type={'email'} placeholder={'email'} {...register('email')}/>
        <input type={'password'} placeholder={'password'} {...register('password')}/>
        <button type={"submit"}>{'Login'}</button>
    </form>
);
};

export {LoginPage};