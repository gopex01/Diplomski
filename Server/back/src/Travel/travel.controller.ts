import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TravelService } from "./travel.service";
import { Travel } from "./travel.schema";
import { newTravel } from "./newTravel.dto";

@Controller('Travel')
export class TravelController
{
    constructor(private readonly travelService:TravelService){}

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
    @Get('getPersonalTravels/:username')
    async getPersonalTravels(@Param('username') username:string)
    {
        return await this.travelService.findPersonalTravels(username);
    }
    @Delete('deleteTravel/:id')
    async deleteTravel(@Param('id') id:string)
    {
        return await this.travelService.deleteTravel(id);
    }

}