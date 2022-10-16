import React from 'react';
import {useDispatch} from "react-redux";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useForm} from "react-hook-form";
import {createUserDocumentFromAuth} from "../../configs";
import {userActions} from "../../redux/slices";


const RegisterPage = () => {

    const dispatch = useDispatch();

    const {handleSubmit, register, reset} = useForm();

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
            }))
            reset();
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            else {
                console.log(e.message);
                console.log(e.code);
                console.log(e);
            }
        }


    }

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <input type={"text"} placeholder={'display name'} {...register('displayName')}/>
            <input type={'email'} placeholder={'email'} {...register('email')}/>
            <input type={'password'} placeholder={'password'} {...register('password')}/>
            <input type={'password'} placeholder={'confirm password'} {...register('confirmPassword')}/>
            <button type={"submit"}>{'Register'}</button>
        </form>
    )

}
export {RegisterPage};