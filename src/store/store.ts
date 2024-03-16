import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from "@reduxjs/toolkit";
import mainSlice from './slices/main-slice';

const combinedReducer = combineReducers({
    mainSlice
});

const store = 
configureStore({
    reducer: combinedReducer,
});

export type RootState = ReturnType<typeof combinedReducer>
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch']
export default store
