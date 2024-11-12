import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Scope, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { UserAdressEntity } from "./entity/addres.entity";
import { OtpEntity } from "./entity/otp.entity";
import { JwtService } from "@nestjs/jwt";
import { UpdateUserDto, UserSignUpDto } from "./dto/user.dto";
import { randomInt } from "crypto";
import { TokenPailod } from "../auth/types/paylod";
import { checkOtpDto } from "../auth/dto/auth.dto";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { UserStatus } from "./enum/user.enum";


@Injectable({scope:Scope.REQUEST})
export class UserService{
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(UserAdressEntity) private readonly useraddresRepository:Repository<UserAdressEntity>,
    @InjectRepository(OtpEntity) private readonly userotpRepository:Repository<OtpEntity>,
    private readonly jwtSirvis:JwtService,
    @Inject(REQUEST) private readonly req:Request
  ){}


  async signUp(signupDto:UserSignUpDto){
    const {phone}=signupDto
    let user=await this.userRepository.findOne({
      where:{phone},
        relations:{otp:true}   
    })
    if(!user) {
      const mobileNumber=parseInt(phone)
    user=  this.userRepository.create({
       phone,
        invait_code:mobileNumber.toString(32).toUpperCase()
        }) 
     await this.userRepository.save(user)  
      }
      if(user.otp?.expiresIn >= new Date(new Date().getTime())) throw new BadRequestException("code alreday befor send")
     await this.createOtpUser(user)

     return{
      message:"user created sucsesfully"
     } 

  }


  async checkOtp(checkOtpDto:checkOtpDto){
    const {mobile,code}=checkOtpDto
    const user=await this.userRepository.findOne({
      where:{phone:mobile},
      relations:{
        otp:true
      }
    })
    const now=new Date();
    if(!user || !user?.otp) throw new UnauthorizedException("Not Find User Accoant")
      const otp=user?.otp;
    if(otp?.code !== code) throw new UnauthorizedException("code is inccrement");
    if(otp?.expiresIn < now ) throw new UnauthorizedException(" code is expired") 
      if(!user.verifay_mobail){
        await this.userRepository.update({id:user.id},{
          verifay_mobail:true
        })
      }
      const {acssesToken,refreshToken}=this.makeTokenForUser({mobile:mobile,userId:user.id})
      return {
        acssesToken,
        refreshToken,
        message:"you logged_in sucessfuly"
      }
  }


  async update(updateDto:UpdateUserDto){
    const {id}= this.req.user
    const {address,invait_code,city,email,first_name,last_name,postal_code,province,title}=updateDto
    const user=await this.userRepository.findOneBy({id})

    if(!user) throw new BadRequestException("first login in accont!")
      if(first_name) user.first_name=first_name;
      if(last_name) user.last_name=last_name;
      if(email) user.email=email;
      if(invait_code){
        const agent=await this.userRepository.findOneBy({invait_code})
        user.agentId=agent.id
      }


        await this.userRepository.save(user)
        let addres=await this.useraddresRepository.findOneBy({userId:id})
        if(addres){
        if(address) addres.address=address
        if(city) addres.city=city
        if(postal_code) addres.postal_code=postal_code
        if(province) addres.province=province
        if(title) addres.title=title
        }else{
         addres= this.useraddresRepository.create({
          address,
          city,
          postal_code,
          province,
          title,
          userId:user.id
         })
        }

        if(!user.verifay_mobail) user.verifay_mobail=true
        user.status=UserStatus.Acssept

        await this.userRepository.save(user)
        await this.useraddresRepository.save(addres)

        return{
          message:"user update info sucsesfully"
        }


       
  }

  async createOtpUser(user:UserEntity){
    const code =randomInt(10000,99999).toString();
    const ExpiresIn=new Date(new Date().getTime() +1000 *60 *2);

    let otp=await this.userotpRepository.findOneBy({userId:user.id})
     if(otp){
      if(otp.expiresIn > new Date()){
        throw new BadRequestException("code is not expierd")
      }
      otp.code=code;
      otp.expiresIn=ExpiresIn
     }else{
      otp= this.userotpRepository.create({code:code,expiresIn:ExpiresIn,userId:user.id})
     }
     await this.userotpRepository.save(otp)
     user.otpId=otp.id
     await this.userRepository.save(user)
  }


  makeTokenForUser(pailod:TokenPailod){
    const acssesToken= this.jwtSirvis.sign(pailod,{
      secret:process.env.ACSSES_TOKEN_SECRET,
      expiresIn:"30d"
    })
    const refreshToken= this.jwtSirvis.sign(pailod,{
      secret:process.env.REFRESH_TOKEN_SECRET,
      expiresIn:"1y"
    })
    return{
      acssesToken,refreshToken
    }
  }
  async validateAcsesToken(token:string){
    try {
      const paylod=this.jwtSirvis.verify<TokenPailod>(token,{
        secret:process.env.ACSSES_TOKEN_SECRET
      })
      if(typeof paylod=="object" && paylod?.userId){
          const user=await this.userRepository.findOneBy({id:paylod.userId})
          if(!user) throw new UnauthorizedException("login on Accont")
            return user
      }
      throw new UnauthorizedException("login on Accont")
    } catch (error) {
      throw new UnauthorizedException("login on Accont")
    }
  }

  async findAddres(id:number){
    const addres=await this.useraddresRepository.findOneBy({id})
    if(!addres) throw new NotFoundException("user addres not found!")
      return addres
  }


}