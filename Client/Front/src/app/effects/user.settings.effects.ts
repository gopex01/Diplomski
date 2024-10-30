import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import * as UserSettingsAction from "../actions/userSettings.action"
import { map, mergeMap } from "rxjs";
@Injectable()
export class UserSettingsEffects{
    
    constructor(private actions$:Actions,private userService:UserService)
    {

    }

    loadUserSettingsInfo$=createEffect(()=>this.actions$.pipe(
        ofType(UserSettingsAction.getSettingsInfo),
        mergeMap(()=>this.userService.getDataForChange().pipe(
            map((userSettings:any)=>UserSettingsAction.setSettingsInfo({userSettings}))
        ))
    ));
}