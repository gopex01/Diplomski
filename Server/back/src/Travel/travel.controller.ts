import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TravelService } from "./travel.service";
import { Travel } from "./travel.schema";
import { newTravel } from "./newTravel.dto";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";
import { UserGuard } from "src/Auth/user.role.guard";

@Controller('Travel')
export class TravelController
{
    constructor(private readonly travelService:TravelService){}

    @UseGuards(JwtAuthGuard,UserGuard)
    @Post('createTravel/:username')
    async create(@Body() newTravel:newTravel,@Param('username') username:string)
    {
        return this.travelService.createTravel(newTravel,username);
    }

    @Get('getAll')
    async getALL()
    {
        return await this.travelService.findAll();
    }
    @UseGuards(JwtAuthGuard,UserGuard)
    @Get('getPersonalTravels/:username')
    async getPersonalTravels(@Param('username') username:string)
    {
        return await this.travelService.findPersonalTravels(username);
    }
    @UseGuards(JwtAuthGuard,UserGuard)
    @Delete('deleteTravel/:id')
    async deleteTravel(@Param('id') id:string)
    {
        return await this.travelService.deleteTravel(id);
    }

}