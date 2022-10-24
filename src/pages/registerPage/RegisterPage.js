import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useForm} from "react-hook-form";
import {Button, Input} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {createUserDocumentFromAuth} from "../../configs";
import {userActions} from "../../redux/slices";
import {useAuth} from "../../hooks";
import css from './RegisterPage.module.css';



const RegisterPage = () => {

    const dispatch = useDispatch();
    const {id} = useAuth();
    const {handleSubmit, register, reset} = useForm();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(`${id} changed`);
    }, [id])

    const handleRegister = async (data) => {
        console.log(data);
        const {email, password, confirmPassword, displayName} = data;

        if(password !== confirmPassword){
            alert('passwords do not match')
            return;
        }

        const auth = getAuth();

        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
            await updateProfile(user, {displayName});
            await createUserDocumentFromAuth(user, {displayName});

            dispatch(userActions.setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                displayName: user.displayName
            }));
            reset();
            navigate(-1);
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            else {
                alert(e.message);
            }
        }


    }

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <h3>Don't have an account?</h3>
            <p>Sign up with your email and password</p>
            <div className={css.formContainer}>
            <Input type={"text"} placeholder={'Display Name'} required={true} color={'secondary'}  {...register('displayName')}/>
            <Input  type={'email'} required={true} placeholder={'Email'} {...register('email')}/>
            <Input  type={'password'} required={true} placeholder={'Password'} color={'secondary'} {...register('password')}/>
            <Input  type={'password'} required={true} placeholder={'Confirm Password'} {...register('confirmPassword')}/>
            <Button type={'submit'}>Sign up</Button>
            </div>
        </form>
    )

}
export {RegisterPage};