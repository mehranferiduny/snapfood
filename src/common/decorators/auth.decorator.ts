import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import {  SuppliarAuthGuard } from "src/modules/supplier/guards/suppliar.guard";


export function UserAuth(){
  return applyDecorators(
    ApiBearerAuth('Authuriztion'),
    UseGuards(AuthGuard)
  )
}
export function SppliarAuth(){
  return applyDecorators(
    ApiBearerAuth('Authuriztion'),
    UseGuards(SuppliarAuthGuard)
  )
}