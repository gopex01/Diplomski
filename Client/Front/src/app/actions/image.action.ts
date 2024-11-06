import { createAction, props } from "@ngrx/store";

export const getimageURL=createAction(
    '[Img] Get Image URL',
    props<{username:string}>()
);
export const setimageURL=createAction(
    '[Img] Set Image URL',
    props<{imageURL:string}>()
);