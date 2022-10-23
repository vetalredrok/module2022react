import React, {Fragment} from 'react';
import {Outlet} from "react-router-dom";

import {DiscoverByGenreComponent} from "../../components";

const DiscoverByGenrePage = () => {
    return (
        <Fragment>
            <Outlet/>
            <DiscoverByGenreComponent/>
        </Fragment>
    );
};

export {DiscoverByGenrePage};