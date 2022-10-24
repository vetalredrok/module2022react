import React from 'react';
import {useDispatch} from "react-redux";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import {Button, Input} from "@mui/material";

import {useForm} from "react-hook-form";
import {userActions} from "../../redux/slices";
import {useNavigate} from "react-router-dom";
import css from './LoginPage.module.css';

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            }));
            reset();
            navigate(-1);
        } catch (e) {
            alert(e.message);
        }


    }
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <h3>Already have an account?</h3>
            <p>Sign in with your email and password</p>
            <div className={css.formContainer}>
                <Input type={'email'} placeholder={'Email'} {...register('email')}/>
                <Input type={'password'} placeholder={'Password'} color={'secondary'} {...register('password')}/>
                <Button type={"submit"}>Sign in</Button>
            </div>
    </form>
);
};

export {LoginPage};