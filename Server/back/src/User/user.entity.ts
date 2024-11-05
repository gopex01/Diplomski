import { Role } from "src/Auth/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class UserEntity
{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column({length:40})
    NameAndSurname:string;

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

    @Column({type:'bytea',nullable:true,default:null})
    image?:Buffer|string;
    
    @Column({default:false})
    Verified:boolean;

    @Column()
    rola:Role;
}