import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserSettingsState } from "../reducers/userSettings.reducer";

export const selectUserSettingsState=createFeatureSelector<UserSettingsState>('settings');

export const selectUserSettingsInfo=createSelector(
    selectUserSettingsState,
    (state)=>state.userSettings
);
export const selectUserCity=createSelector(
    selectUserSettingsState,
    (state)=>state.userSettings?.City
)
export const selectUserName=createSelector(
    selectUserSettingsState,
    (state)=>state.userSettings?.NameAndSurname
);

export const selectUserPhone=createSelector(
    selectUserSettingsState,
    (state)=>state.userSettings?.PhoneNumber
)
export const selectUserEmail=createSelector(
    selectUserSettingsState,
    (state)=>state?.userSettings?.Email
)