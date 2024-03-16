import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Review } from "../../types/reviews";
// interface Review {
//     date: string;
//     name: string;
//     review: string;
// }
export interface IMainState {
    reviews: { data: Review[] }[],
    language: 'ru' | 'en'
  }

const initialState:IMainState = {
    reviews: [

    ],
    language: 'ru'
};

const mainSlice = createSlice({
    name:'main',
    initialState,
    reducers : {
        setReviews: (state: IMainState, action: PayloadAction<{ data: Review[] }[]>) => {
            state.reviews = action.payload
        },
        setLanguage: (state: IMainState, action: PayloadAction<'ru' | 'en'>) => {
            state.language = action.payload
        },
    },
});

export const { 
    setReviews,
    setLanguage
  } = mainSlice.actions
  
  export default mainSlice.reducer