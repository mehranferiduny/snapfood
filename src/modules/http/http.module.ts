import { HttpModule, HttpService } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ZarinPallService } from "./zarinpall.service";

@Global()
@Module({
  imports:[
    HttpModule.register({
      maxRedirects:5,
      timeout:5000
    })
  ],
  exports:[HttpService,ZarinPallService],
  providers:[HttpService,ZarinPallService],
})

export class HttpApiModules{}