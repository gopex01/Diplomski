import { IsString, IsEmail, IsDate, Length } from 'class-validator';
export class UserDto{

    @IsString()
    @Length(1,20)
    name:string;

    @IsString()
    @Length(1,20)
    surname:string;
    
    @IsEmail()
    email:string;

    @IsString()
    username:string;

    @IsString()
    password:string;

    @IsString()
    @Length(1,15)
    phonenumber:string;

    @IsString()
    @Length(1,13)
    jmbg:string;

    @IsDate()
    dateofbirth:Date;

    @IsString()
    city:string;

    @IsString()
    country:string;


}