import { MongooseModule } from "@nestjs/mongoose";
import { TravelSchema,Travel } from "./travel.schema";
import { Module } from "@nestjs/common";
import { TravelController } from "./travel.controller";
import { TravelService } from "./travel.service";


@Module({
    
    imports:[MongooseModule.forFeature([{name:Travel.name,schema:TravelSchema}])],
    controllers:[TravelController],
    providers:[TravelService]
})
export class TravelModule{}