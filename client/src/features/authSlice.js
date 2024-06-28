import {createSlice, configureStore, Tuple, createAsyncThunk } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        access_token: null,
        user: {},
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
        },
        preflight: (state, action) => {
            try{
                if(new Date(localStorage.getItem('expireAt')) < new Date()){
                  state.isAuthenticated = true;
                  
                }else{
                  state.user = JSON.parse(localStorage.getItem('user'));
                  state.access_token = localStorage.getItem('access_token');
                  state.expireAt = localStorage.getItem('expireAt');
                  state.isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));
                  
                }
              }catch(e){
                state;
              }

        }

    }
})

const authStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});



export {authSlice}

export default authStore