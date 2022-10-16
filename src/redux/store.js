import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {userReducer} from "./slices";



const rootReducer = combineReducers({
    user: userReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {
    setupStore
};