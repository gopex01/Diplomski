import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/login.reducer";

export const selectLoginState=createFeatureSelector<AuthState>('auth');

export const selectAuthToken=createSelector(
    selectLoginState,
    (authState)=>authState.token
);

export const selectUsername=createSelector(
    selectLoginState,
    (authState)=>authState.username
);