import { createReducer, on } from "@ngrx/store";
import { loginAction, loginActionSuccess, updateState } from "../actions/login.action";

export interface AuthState{
    token:string|null;
    username:string;
}
export const initialState:AuthState={
    token:'',
    username:''
}

export const loginReducer=createReducer(
    initialState,
    on(loginAction,(state,action)=>{
        return{
            ...state,
            token:null
        };
    }),
    on(loginActionSuccess,(state,action)=>{
        console.log(state);
        return {
            ...state,
            token:action.token,
            username:action.username
        }
    }),
    on(updateState,(state,{token,username})=>({
        ...state,
        token,
        username
    }))
)