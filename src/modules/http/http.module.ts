import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports:[
    HttpModule.register({
      maxRedirects:5,
      timeout:5000
    })
  ],
  exports:[],
  providers:[],
})

export class HttpApiModules{}