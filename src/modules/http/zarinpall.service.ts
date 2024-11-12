import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { catchError, lastValueFrom, map } from "rxjs";


@Injectable()
export class ZarinPallService{
  constructor(
    private readonly httpSercice:HttpService
  ){}

  async sendRequest(data?:any){
    const {amount,email,phone,description}=data
    const option={
      merchant_id:process.env.ZARINPAL_MERCHENT_ID,
      amount:amount * 10,
      description,
      metadata:{
        email:email ?? "exampel.gmail.com",
        mobail:phone ?? "091- --- -- --",
      },
      callback_url:`${process.env.URL}payment/verify`
    

    }

   
    const resault=await lastValueFrom(
      this.httpSercice
      .post(process.env.ZARINPAL_RREQEST_URL,option,{})
      .pipe(map(res=>res.data))
      .pipe(
        catchError((err)=>{
          console.log(err)
          throw new InternalServerErrorException("zarinpal error!")
        })
      )
    )

    const {authority,code}=resault.data

    if(code == 100 && authority){
      return {
        code,
        authority,
        gatewayURl:`${process.env.ZARINPAL_GETWAY_URL}/${authority}`
      }
    }
    throw new BadRequestException("connection feiled zarinpal")
   
  }
  async verifyRequest(data?:any){
    const option={
      authority:data.authority,
      amount:data.amount * 10,
      merchant_id:process.env.ZARINPAL_MERCHENT_ID
    }
    
    const resault=await lastValueFrom(
      this.httpSercice.post(process.env.ZARINPAL_VERIFAY_URL,option,{})
      .pipe(map(res=>res.data))
      .pipe(catchError((err)=>{
        console.log(err)
        throw new InternalServerErrorException("zarinpal connection failed!")
      }))
    )
    return resault
  }
} 