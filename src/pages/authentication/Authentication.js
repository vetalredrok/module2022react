import React from 'react';

import {LoginPage} from "../loginPage/LoginPage";
import {RegisterPage} from "../registerPage/RegisterPage";
import css from './Authentication.module.css';

const Authentication = () => {
    return (
        <div className={css.authenticationContainer}>
            <LoginPage/>
            <RegisterPage/>
        </div>
    );
};

export {Authentication};