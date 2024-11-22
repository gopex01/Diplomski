import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import * as ImageAcctions from "../actions/image.action"
import { map, mergeMap } from "rxjs";
@Injectable()
export class ImageEffects
{
    constructor(private actions$:Actions,private userService:UserService)
    {

    }
    loadImageURL$=createEffect(()=>this.actions$.pipe(
        ofType(ImageAcctions.getimageURL),
        mergeMap(()=>this.userService.getImageURL().pipe(
            map((imageURL:any)=>ImageAcctions.setimageURL(imageURL))
        ))
    ));
}