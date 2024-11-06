import { createReducer, on } from "@ngrx/store";
import * as imageActions from "../actions/image.action"
export interface ImageURLState{
    imageURL:string;
};

export const initialState:ImageURLState={
    imageURL:''
};


export const imageReducer=createReducer(
    initialState,
    on(imageActions.setimageURL,(state,{imageURL})=>({
        ...state,
        imageURL
    })))