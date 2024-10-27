import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import * as bcrypt from "bcrypt";
import * as nodemailer from 'nodemailer';
import { Role } from "src/Auth/roles.enum";
@Injectable()
export class UserService{
    private transporter;//objekat koji sluzi za slanje mailova
    

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>,
        
    )
    {
        this.transporter=nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:'gopex2001@gmail.com',
                pass:'fzau shuu mvdm jcgx',
            },
            secure:true
        });
    }

    async addUser(newUser:UserDto):Promise<string>{
        const hashedPass=await bcrypt.hash(newUser.password,10);
        const nUser:UserEntity=this.userRepository.create({
            NameAndSurname:newUser.nameAndsurname,
            Email:newUser.email,
            Username:newUser.username,
            Password:hashedPass,
            PhoneNumber:newUser.phonenumber,
            JMBG:newUser.jmbg,
            DateOfBirth:newUser.dateofbirth,
            City:newUser.city,
            rola:Role.User

        });
        try{

            await this.userRepository.save(nUser);
            await this.sendVerificationEmail(newUser.username,newUser.email);
            return "Success created account";
        }
        catch(error){
            if(error.code='23505')
                {
                    const constraint = error.detail.match(/\((.*?)\)/); 
                    if (constraint) {
                      const columns = constraint[1].split(', ');
                     
                      return `User with ${columns.join(', ')} is already exist `
                    }
                    return error;
                }
            console.log(error);
        }
    }
    async sendVerificationEmail(username:string,email:string)
    {
        const verificationLink=`http://localhost:3000/User/verifyAccount/${username}`;
        //const verificationLink = `https://6bb6-87-116-160-1.ngrok-free.app/User/verifyAccount/${username}`;//tunelovanje

        const mailOptions = {
            from: 'gopex2001@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 5px;">
                    <h2 style="color: #333;">Email Verification</h2>
                    <p style="color: #555;">Thank you for registering! Please verify your email address by clicking the link below:</p>
                    <a href="${verificationLink}" style="display: inline-block; padding: 10px 15px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px;">Verify Email</a>
                    <p style="color: #555; margin-top: 20px;">If you did not create an account, no further action is required.</p>
                    <p style="color: #555;">Best regards,<br>Your Team</p>
                </div>
            `,
        };
        /*const mailOptions = {
            from: 'gopex2001@gmail.com', // Vaša e-adresa
            to: email,
            subject: 'Verifikacija e-adrese',
            text: `Kliknite na sledeći link da biste verifikovali svoju e-adresu: ${verificationLink}`
          };*/
        
        await this.transporter.sendMail(mailOptions);
    }
  
    async verifyAccount(username:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(!user)
        {
            return "Error";
        }
        user.Verified=true;
        await this.userRepository.save(user);
        return "You have successfully verified your account";
    }
    async getUserByUsername(username:string):Promise<UserEntity>
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            return user;
        }
        else{
            return null;
        }
    }
}