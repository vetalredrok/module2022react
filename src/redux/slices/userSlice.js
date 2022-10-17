import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
    displayName: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.displayName = action.payload.displayName;
            console.log(state.email, state.displayName, state.id);
        },
        removeUser: (state)=>{
            state.email = null;
            state.token = null;
            state.id = null;
            state.displayName = null;
            console.log(state.email, state.displayName, state.id);
        },
    }
});

const {reducer: userReducer, actions:{setUser, removeUser}} = userSlice;
const userActions ={
    setUser,
    removeUser
};

export {userReducer, userActions};