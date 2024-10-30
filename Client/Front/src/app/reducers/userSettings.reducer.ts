import { createReducer, on } from "@ngrx/store";
import { userSettings } from "../models/user.settings.model";
import * as UserSettingsActions from "../actions/userSettings.action"
export interface UserSettingsState{
    userSettings:userSettings|null;
}

export const initialState:UserSettingsState={
    userSettings:null
};

export const userSettingsReducer=createReducer(
    initialState,
    on(UserSettingsActions.setSettingsInfo,(state,{userSettings})=>({
        ...state,
        userSettings
    }))
)
