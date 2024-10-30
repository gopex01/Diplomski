import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";
import { UserGuard } from "src/Auth/user.role.guard";

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

    @UseGuards(JwtAuthGuard,UserGuard)
    @Get('getUserByUsername/:username')
    async getUserByUsername(@Param('username') username:string)
    {
        return await this.userService.getUserByUsername(username);
    }

    @UseGuards(JwtAuthGuard,UserGuard)
    @Patch('changePassword/:username/:oldPass/:newPass')
    async changePassword(@Param('username') username:string,
    @Param('oldPass') oldPass:string,
    @Param('newPass') newPass:string)
    {
        return await this.userService.changePassword(username,oldPass,newPass);
    }

    @UseGuards(JwtAuthGuard,UserGuard)
    @Patch('changePhoneNumber/:username/:newPhoneNumber')
    async changePhoneNumber(@Param('username') username:string,
    @Param('newPhoneNumber') newPhoneNumber:string)
    {
        return await this.userService.changePhoneNumber(username,newPhoneNumber);
    }

    @UseGuards(JwtAuthGuard,UserGuard)
    @Patch('changeCity/:username/:newCity')
    async changeCity(@Param('username') username:string,
    @Param('newCity') newCity:string)
    {
       return await this.userService.changeCity(username,newCity);
    }

    @UseGuards(JwtAuthGuard,UserGuard)
    @Patch('changeName/:username/:newName')
    async changeName(@Param('username') username:string,
    @Param('newName') newName:string)
    {
        return await this.userService.changeName(username,newName) ;
    }

    @UseGuards(JwtAuthGuard,UserGuard)
    @Get('getDataForChange/:username')
    async getDataForChange(@Param('username') username:string)
    {
        return await this.userService.getDataForChange(username);
    }

    @UseGuards(JwtAuthGuard,UserGuard)
    @Patch('changeEmail/:username/:newEmail')
    async changeEmail(@Param('username') username:string,
    @Param('newEmail') newEmail:string)
    {
        return await this.userService.changeEmail(username,newEmail);
    }

    @Post('forgotPassword/:username/:email')
    async forgotPassword(@Param('username') username:string,
    @Param('email') email:string)
    {
        return await this.userService.forgotPassword(username,email);
    }
    
    @Delete('deactivateAccount/:username')
    async deactivateAccount(@Param('username') username:string)
    {
        return await this.userService.deactivateAccount(username);
    }
   
}