import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { SupplierService } from "../supplier.service";
import { Reflector } from "@nestjs/core";
import { SKIP_AUTH, SkipAuth } from "src/common/decorators/skip-auth.decorator";


@Injectable()
export class SuppliarAuthGuard implements CanActivate {
  constructor(
    private readonly suppliarServis: SupplierService,
    private readonly reflector:Reflector
  ) {}
  async canActivate(context: ExecutionContext) {

    const IsAuthSkip=this.reflector.get<Boolean>(SKIP_AUTH,context.getHandler())
    if(IsAuthSkip) return true;
    const httpContex = context.switchToHttp();
    const request: Request = httpContex.getRequest<Request>();
    const token = this.extarcToken(request);
    const suoliar=await this.suppliarServis.validateAcsesToken(token);
    request.suppliar = suoliar;
    return true;
  }

  extarcToken(request: Request) {
    const { authorization } = request.headers;

    // authorization:"bearer fjojdg;ksg;g;sg;;ssjf"
    if (!authorization || authorization.trim() == "")
      throw new UnauthorizedException("login on accont");
    const [bearer, token] = authorization.split(" ");
    if (bearer.toLowerCase() !== "bearer" || !token || !isJWT(token))
      throw new UnauthorizedException("login on accont");
    
    return token;
  }
}
