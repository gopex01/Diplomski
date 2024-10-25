import { Injectable } from "@nestjs/common";
import { UserService } from "src/User/user.service";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/User/user.entity";
@Injectable()
export class AuthService{
    constructor(private userService:UserService,
        private jwtService:JwtService
    ) {
        
    }

    async validateUser(username:string,pass:string):Promise<any>
    {
        const user:UserEntity=await this.userService.getUserByUsername(username);
        if(user)
        {
            const isMatchs=await bcrypt.compare(pass,user.Password);
            if(isMatchs)
            {
                if(user.Verified===true){
                    const {Password, ...result}=user;
                    return result;
                }
            }
        }
        else{
            return null;
        }
    }
    async login(user:any)
    {
        const payload={user:user.Username,sub:user.Id,role:user.rola};
        return {
            access_token:this.jwtService.sign(payload),
            username:user.Username,
            rola:user.rola
        };
    }
}