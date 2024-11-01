import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { isJWT } from "class-validator";
import { AuthService } from "src/modules/auth/auth.service";
import { NextFunction, Request } from "express";
import { SupplierService } from "src/modules/supplier/supplier.service";
import { statusSuppliar } from "src/modules/supplier/enum/status.enum";



@Injectable()
export class NextLevelInfo implements NestMiddleware{
  constructor(
    private readonly suppliarServis:SupplierService
  ){}
 async use(req: Request, res: Response, next:NextFunction) {

    const token = this.extractToken(req);
    if(!token) return next();

        let supliar = await this.suppliarServis.validateAcsesToken(token);
        
        if(supliar.status !== statusSuppliar.SuppliartyInformation)
          throw new BadRequestException("error! peleas first fixed info")
   
    next();
  }


  protected extractToken(request: Request) {
    const { authorization } = request.headers;
    if (!authorization || authorization?.trim() == "") {
        return null
    }
    const [bearer, token] = authorization?.split(" ");
    if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) {
        return null
    }
    return token; 
}
  

}
@Injectable()
export class NextLevelDocument implements NestMiddleware{
  constructor(
    private readonly suppliarServis:SupplierService
  ){}
 async use(req: Request, res: Response, next:NextFunction) {

    const token = this.extractToken(req);
    if(!token) return next();

        let supliar = await this.suppliarServis.validateAcsesToken(token);
        
        if(supliar.status !== statusSuppliar.UploadDocument)
          throw new BadRequestException("error! peleas first fixed upluad document")
   
    next();
  }


  protected extractToken(request: Request) {
    const { authorization } = request.headers;
    if (!authorization || authorization?.trim() == "") {
        return null
    }
    const [bearer, token] = authorization?.split(" ");
    if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) {
        return null
    }
    return token; 
}
  

}



