import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { OtpEntity } from '../user/entity/otp.entity';
import { checkOtpDto, sendOtpDto } from './dto/auth.dto';
import { randomInt } from 'crypto';
import { TokenPailod } from './types/paylod';
import { JwtService } from '@nestjs/jwt';
import { SupplierEntity } from '../supplier/entities/supplier.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(OtpEntity) private readonly otpRepository:Repository<OtpEntity>,
    private jwtSirvis:JwtService,
  
  ){}

  async sendOtp(sendOtpDto:sendOtpDto){
   const {mobile}=sendOtpDto;
  
   let user=await this.userRepository.findOneBy({phone:mobile})
   if(!user){
     user= this.userRepository.create({
      phone:mobile
     })
     await this.userRepository.save(user)
   }
   await this.createOtpUser(user);
  
   return{
    message:"send code is sucsesfuly",
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
  async createOtpUser(user:UserEntity){
    const code =randomInt(10000,99999).toString();
    const ExpiresIn=new Date(new Date().getTime() +1000 *60 *2);

    let otp=await this.otpRepository.findOneBy({userId:user.id})
     if(otp){
      if(otp.expiresIn > new Date()){
        throw new BadRequestException("code is not expierd")
      }
      otp.code=code;
      otp.expiresIn=ExpiresIn
     }else{
      otp= this.otpRepository.create({code:code,expiresIn:ExpiresIn,userId:user.id})
     }
     await this.otpRepository.save(otp)
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
  


 
  async mobailCheck(mobail:string){
    const user=await this.userRepository.findOneBy({phone:mobail})
    if(user) throw new ConflictException("mobail number is alredy exist")
  }

}
