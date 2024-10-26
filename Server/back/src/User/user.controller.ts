import { Body, Controller, Get, Inject, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@Controller('User')
export class UserController{
    constructor(
        @Inject(UserService)
        private readonly userService:UserService){}

    @Post('addUser')
    async addUser(@Body() newUser:UserDto)
    {
        return await this.userService.addUser(newUser);
    }
    @Get('verifyAccount/:username')
    async verifyAccount(username:string)
    {
        return await this.userService.verifyAccount(username);
    }
}