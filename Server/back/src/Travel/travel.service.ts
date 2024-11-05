import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Travel } from "./travel.schema";
import { Model } from "mongoose";
import { newTravel } from "./newTravel.dto";

@Injectable()
export class TravelService{
    
    constructor(@InjectModel(Travel.name) private travelModel:Model<Travel>){}

    async createTravel(newTravel:newTravel,user:string)
    {
        let travel={
            startPoint:newTravel.startPoint,
            endPoint:newTravel.endPoint,
            username:user,
            accrossTheBorder:newTravel.accrossTheBorder
        }
        const createdTravel=new this.travelModel(travel);
        createdTravel.save();
        return "Success created travel";
    }
    async findAll()
    {
        return this.travelModel.find().exec();
    }
    async findPersonalTravels(username:string)
    {
        return this.travelModel.find({username:username}).exec();
    }
}