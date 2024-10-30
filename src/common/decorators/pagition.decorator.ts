import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function Pagition(page:number=1,limit:number=10){
  return applyDecorators(
    ApiQuery({name:"page",example:page,required:false,type:"integer"}),
    ApiQuery({name:"limit",example:limit,required:false,type:"integer"})
  )
}