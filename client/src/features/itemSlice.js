import {createSlice, configureStore, Tuple, createAsyncThunk } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

const itemSlice = createSlice({
    name: "item",
    initialState: {
        items: [],
    },
    reducers: {
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
        }
    }
})

const itemStore = configureStore({
    reducer: {
        auth: itemSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});



export {itemSlice}

export default itemStore