import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {moviesReducer, userReducer} from "./slices";



const rootReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {
    setupStore
};