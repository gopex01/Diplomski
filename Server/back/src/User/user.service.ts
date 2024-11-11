import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import * as bcrypt from "bcrypt";
import * as nodemailer from 'nodemailer';
import { Role } from "src/Auth/roles.enum";
import { userSettingsDto } from "./user.Settings.Dto";
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
            rola:Role.User,
            image:null

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
    async sendMailForChangeEmail(username:string,email:string)
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
                    <p style="color: #555;">You successfully change your email! Please verify your email address by clicking the link below:</p>
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
    async generateRandomPassword(length: number = 10){
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
    async sendMailForResetPassword(username:string,email:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            
            const temporaryPassword = await this.generateRandomPassword(12);
            const hashedPass=await bcrypt.hash(temporaryPassword,10);
            user.Password=hashedPass;
            await this.userRepository.update(user.Id,user);
            const mailOptions = {
                from: 'gopex2001@gmail.com',
                to: email,
                subject: 'Reset password',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 5px;">
                        <p style="color: #555; margin-top: 20px;">Your temporary password is.</p>
                        <p>${temporaryPassword}</p>
                        <p style="color: #555;">Best regards,<br>Your Team</p>
                    </div>
                `,
            };
            
            await this.transporter.sendMail(mailOptions);
        }
        else{
            return "User not found!";
        }
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
            if(user.image){
            user.image=user.image.toString('base64');
            }
            return user;
        }
        else{
            return null;
        }
    }

    async changePassword(username:string,oldPass:string,newPass:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            const isMatchs=await bcrypt.compare(oldPass,user.Password);
            if(isMatchs)
            {   const hashedNewPass = await bcrypt.hash(newPass, 10);
                user.Password = hashedNewPass;
                await this.userRepository.save(user);
                return {message:"Success"}

            }
            else{
                return {message:"Current password is inncorrect!"}
            }
        }
        else{
            return {message:"User not found!"}
        }
    }

    async changePhoneNumber(username:string,newPhoneNumber:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            user.PhoneNumber=newPhoneNumber;
            await this.userRepository.update(user.Id,user);
            return {message:"Success"};
        }
        else{
            return {message:"User not found"};
        }
    }
    
    async changeCity(username:string,newCity:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            user.City=newCity;
            await this.userRepository.update(user.Id,user);
            return  {message:"Success"}
        }
        else{
            return {message:"User not found"};
        }
    }

    async changeEmail(username:string,newEmail:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            user.Email=newEmail;
            user.Verified=false;
            await this.sendMailForChangeEmail(username,newEmail);
            await this.userRepository.update(user.Id,user);
            return {message:"Success"}
        }
        else{
            return {message:"User Not Found!"}
        }

    }
    async forgotPassword(username:string,email:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            await this.sendMailForResetPassword(username,email);
            return {message:'Success'}
        }
        else{
        }
    }
    async changeName(username:string,newNameAndSurname:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            user.NameAndSurname=newNameAndSurname;
            await this.userRepository.update(user.Id,user);
            return {message:"Success"}
        }
        else{
            return {message:"User not found"}
        }
    }
    async getDataForChange(username:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            let retObj:userSettingsDto={
                NameAndSurname:user.NameAndSurname,
                Password:user.Password,
                PhoneNumber:user.PhoneNumber,
                City:user.City,
                Email:user.Email
            }
            return retObj;
        }
        else{
            return "User Not Found!";
        }
    }
    async deactivateAccount(username:string)
    {
        const user:UserEntity=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            await this.userRepository.delete(user);
            return {message:"Success"}
        }
        else{
            return "User not found";
        }
    }

    async updateUserPhoto(username:string,imageBuffer:Buffer)
    {
        const user=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            user.image=imageBuffer;
            await this.userRepository.save(user);
            return user.image.toString('base64');
        }
        else{
            return "User not found!";
        }
    }

    async getImageURL(username:string)
    {
        const user=await this.userRepository.findOne({where:{Username:username}});
        if(user)
        {
            return user.image.toString('base64');
        }
        else{
            return "User not found!";
        }
    }
}