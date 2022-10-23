import React, {Fragment} from 'react';
import {Outlet} from "react-router-dom";

import {SearchComponent} from "../../components";

const SearchPage = () => {
    return (
        <Fragment>
            <Outlet/>
            <SearchComponent/>
        </Fragment>
    );
};

export {SearchPage};