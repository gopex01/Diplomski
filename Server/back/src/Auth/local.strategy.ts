import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super();
    }

    async validate(username:string,pass:string):Promise<any>
    {
        const user=await this.authService.validateUser(username,pass);
        if(!user)
        {
            throw new UnauthorizedException();
        }
        return user;
    }
}