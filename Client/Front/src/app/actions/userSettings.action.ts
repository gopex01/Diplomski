import { createAction, props } from "@ngrx/store";
import { userSettings } from "../models/user.settings.model";

export const getSettingsInfo=createAction(
    '[User] Get Settings Info',
    props<{username:string}>()
);
export const setSettingsInfo=createAction(
    '[User] Set Settings Info',
    props<{userSettings:userSettings}>()
);