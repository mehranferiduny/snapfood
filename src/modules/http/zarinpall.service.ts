import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ZarinPallService{
  constructor(
    private readonly httpSercice:HttpService
  ){}

  async sendRequest(data?:any){
    this.httpSercice.post(process.env.ZARINPAL_RREQEST_URL,data,{})
  }
  async verifyRequest(data?:any){
    this.httpSercice.post(process.env.ZARINPAL_VERIFAY_URL,data,{})
  }
} 