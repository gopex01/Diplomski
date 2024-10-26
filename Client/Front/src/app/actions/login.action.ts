import { createAction, props } from "@ngrx/store";

export const loginAction=createAction(
    '[Auth] Login',
    props<{token:string,username:string}>()
);

export const loginActionSuccess=createAction(
    '[Auth] Login',
    props<{token:string,username:string}>()
);
export const updateState=createAction(
    '[Auth] Update',
    props<{token:string,username:string}>()
);