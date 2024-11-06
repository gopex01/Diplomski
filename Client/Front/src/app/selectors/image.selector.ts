import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ImageURLState } from "../reducers/image.reducer";

export const selectImageState=createFeatureSelector<ImageURLState>('image');

export const selectImageURL=createSelector(
    selectImageState,
    (state)=>state.imageURL
);