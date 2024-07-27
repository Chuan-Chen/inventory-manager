import {createSlice, configureStore, Tuple, createAsyncThunk } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

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
            localStorage.setItem('isAuthenticated', state.isAuthenticated);
        },
        preflight: (state, action) => {
            try{
                if(new Date(localStorage.getItem('expireAt')) > new Date()){
                    state.isAuthenticated = true;
                    
                }

                state.user = JSON.parse(localStorage.getItem('user'));
                state.access_token = localStorage.getItem('access_token');
                state.expireAt = localStorage.getItem('expireAt');
              }catch(e){
                state;
              }
        },
        checkToken: (state, action) => {
            if(new Date(localStorage.getItem('expireAt')) > new Date()){
                console.log("check token is called but returned true")
                state.isAuthenticated = true;
                localStorage.setItem('isAuthenticated', state.isAuthenticated);
            }else{
                state.isAuthenticated = false;
                localStorage.setItem('isAuthenticated', state.isAuthenticated);
            }
        },
        loadItems: (state, action) => {
            state.items = [action.payload];
            console.log(action.payload)
        }
    },
    extraReducers: (builder) => {
        
    }
})

const saveItem = () => async (dispatch, getState) => {
    const items = getState().items;
    const result = await fetch("http://localhost:3000/api/item/create", {
        method: "post"
    })
}

export const getItems = () => async (dispatch, getState) => {
    const items = await fetch("http://localhost:3000/api/item/read").then( res => res.json());
    dispatch(authSlice.actions.loadItems(items))
}


const authStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});



export {authSlice}

export default authStore