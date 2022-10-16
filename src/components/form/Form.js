import React, {useState} from 'react';
import {useForm} from "react-hook-form";

const Form = ({title, submit}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const {handleSubmit, register} = useForm()



    return (
        <form onSubmit={handleSubmit(submit)}>
            <input type={'email'} placeholder={'email'} {...register('email')}/>
            <input type={'password'} placeholder={'password'} {...register('password')}/>
            <button type={"submit"}>{title}</button>
        </form>
    );
};

export {Form};