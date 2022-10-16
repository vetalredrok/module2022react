import React from 'react';
import {Route, Routes} from "react-router-dom";

import {Authentication, HomePage} from "../../pages";
import {Navigation} from "../../components";



const MainLayout = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigation/>}>
                <Route index element={<HomePage/>}/>
                <Route path={'auth'} element={<Authentication/>}/>

            </Route>

        </Routes>
    );
};

export {MainLayout};