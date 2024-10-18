import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class UserEntity
{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column({length:20})
    Name:string;

    @Column({length:20})
    Surname:string;

    @Column({unique:true})
    Email:string;

    @Column({unique:true})
    Username:string;

    @Column({unique:true})
    Password:string;
    
    @Column({length:15})
    PhoneNumber:string;

    @Column({length:13})
    JMBG:string;

    @Column()
    DateOfBirth:Date;

    @Column()
    City:string;
    
    @Column()
    Country:string;
    
    @Column({default:false})
    Verified:boolean;
}