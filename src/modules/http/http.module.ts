import { HttpModule, HttpService } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ZarinPallService } from "./zarinpall.service";

@Global()
@Module({
  imports:[
    HttpModule.register({
      maxRedirects:5,
      timeout:5000
    }),
  ],
  exports:[ZarinPallService,HttpModule],
  providers:[ZarinPallService],
})

export class HttpApiModules{}