import {createSlice, configureStore, Tuple, createAsyncThunk } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import API from './api';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        access_token: null,
        user: {},
        items: [],
        expireAt: null,
    },
    reducers: {
        login: (state, action) => {
            //destructred
            const {user, access_token, expireAt} = action.payload;
            console.log(action)
            if(access_token != null){
                state.isAuthenticated = true;
            }
            state.expireAt = expireAt;
            state.user = user;
            state.access_token = access_token;
            localStorage.setItem('expireAt', state.expireAt)
            localStorage.setItem('isAuthenticated', state.isAuthenticated);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('access_token', state.access_token);
        },
        logout: (state, action) => {
            state.user = null;
            state.access_token = null;
            state.isAuthenticated = false;
            //localStorage.setItem('isAuthenticated', state.isAuthenticated);
        },
        preflight: (state, action) => {
            try{
                //need to fix preflights to make sure all tokens are checked.
                if(new Date(localStorage.getItem('expireAt')) > new Date() || new Date(state.expireAt) > new Date()){
                    state.isAuthenticated = true;
                }
                state.user = JSON.parse(localStorage.getItem('user'));
                state.user.ProfilePicture = localStorage.getItem("ProfilePicture")
                state.access_token = localStorage.getItem('access_token');
                state.expireAt = localStorage.getItem('expireAt');
              }catch(e){
                state;
              }
        },
        checkToken: (state, action) => {
            if(new Date(localStorage.getItem('expireAt')) > new Date()){
                //console.log("check token is called but returned true")
                state.isAuthenticated = true;
                localStorage.setItem('isAuthenticated', state.isAuthenticated);
            }else{
                state.isAuthenticated = false;
                localStorage.setItem('isAuthenticated', state.isAuthenticated);
            }
        },
        loadItems: (state, action) => {
            state.items = [...action.payload]
        },
        updateUser: (state, action) => {
            state.user.ProfilePicture = action.payload;
            localStorage.setItem("ProfilePicture", action.payload)
            //state.user = user;
        }
    }
})



const authStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});


export const getItems = (Username) => async dispatch => {
        const param = {
            Username: Username
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param),
        }
        const url = API.SERVER + "/api/item/read"
        const items = await fetch(url, options);
        const parsedData = await items.json();
        console.log(parsedData)
        dispatch(authSlice.actions.loadItems(await parsedData.result));
}

export const getAllItems = () => async dispatch => {
    const items = await fetch("http://localhost:3000/api/item/read");
    const parsedData = await items.json();
    dispatch(authSlice.actions.loadItems(await parsedData.result));
}


export {authSlice}

export default authStore