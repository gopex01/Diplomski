import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Travel extends Document{
    
    @Prop({required:true})
    startPoint:string;

    @Prop({required:true})
    endPoint:string;

    @Prop({required:true})
    username:string;

    @Prop({required:true})
    accrossTheBorder:Boolean

    @Prop({required:true})
    date:Date;

}
export const TravelSchema=SchemaFactory.createForClass(Travel);