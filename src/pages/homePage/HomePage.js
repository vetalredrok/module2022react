import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Container, Pagination} from '@mui/material';

import {RawForGenres, RawForTop} from "../../components";

const HomePage = () => {

    const [page, setPage] = useState(1);



    return (
        <Fragment>
            <RawForTop page={page}/>
            <RawForGenres genre={878} page={page} title={'Science Fiction:'}/>
            <RawForGenres genre={36} page={page} title={'History:'}/>
            <RawForGenres genre={27} page={page} title={'Horror:'}/>
            <RawForGenres genre={10752} page={page} title={'War:'}/>
            <RawForGenres genre={99} page={page} title={'Documentary:'}/>

            <Container>
                <Pagination
                count={500}
                page={page}
                onChange={(_, num) => setPage(num)}
                />
            </Container>
        </Fragment>

    );
};

export {HomePage};