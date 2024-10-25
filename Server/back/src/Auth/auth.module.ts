import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "src/User/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { LocalStrategy } from "./local.strategy";
import { UserService } from "src/User/user.service";

@Module({
    imports:[
        UserModule,
        PassportModule,
        JwtModule.register({
            secret:jwtConstants.secret,
            signOptions:{expiresIn:'60m'}
        })
    ],
    providers:[AuthService,JwtStrategy,LocalStrategy],
    exports:[AuthService]
    
})
export class AuthModule{}