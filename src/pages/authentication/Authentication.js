import React from 'react';
import {LoginPage} from "../loginPage/LoginPage";
import {RegisterPage} from "../registerPage/RegisterPage";

const Authentication = () => {
    return (
        <div>
            <LoginPage/>
            <RegisterPage/>
        </div>
    );
};

export {Authentication};