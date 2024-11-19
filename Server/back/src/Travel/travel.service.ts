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
            accrossTheBorder:newTravel.accrossTheBorder,
            date:Date.now()
        }
        const createdTravel=new this.travelModel(travel);
        const create=createdTravel.save();
        if(create){
        return {message:"Success created travel"};
        }
        else{
            return {message:"Error"};
        }
    }
    async findAll()
    {
        return this.travelModel.find().exec();
    }
    async findPersonalTravels(username:string)
    {
        return this.travelModel.find({username:username}).exec();
    }
    async deleteTravel(id:string)
    {
        const travel=await this.travelModel.find({_id:id});
        if(travel)
        {
            await this.travelModel.deleteOne({_id:id});
            return {message:"Success"};
        }
        else{
            return {message:"Not found!"};
        }
    }
}