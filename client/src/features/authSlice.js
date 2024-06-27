import {createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        error: null,
        access_token: null,
        user: {},
    },
    reducers: {
        login: (state, action) => {
            //destructred
            const {user, access_token} = action.payload;
            state.user = user;
            state.access_token = access_token;
        },
        logout: (state, action) => {
            state.user = null;
            state.access_token = null;
            state.isAuthenticated = false;
        }

    }
})

const authStore = configureStore({
    reducer: {
        authorization: authSlice.reducer,
    }
})



export const {login, logout} = authSlice.actions

export default authStore

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.access_token;