import { IsString, IsEmail, IsDate, Length } from 'class-validator';
export class UserDto{

    @IsString()
    @Length(1,40)
    nameAndsurname:string;
    
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



}