import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsString, Length } from "class-validator";

export class CreateDiscountDto {

  @ApiProperty()
  @Length(5)
  @IsString()
  code:string;

  @ApiPropertyOptional()
  percent:number;
  
  @ApiPropertyOptional()
  amount:number;

  @ApiPropertyOptional()
  expierIn:Date

  @ApiPropertyOptional()
  limit:number


  @ApiPropertyOptional()
  active:boolean
}
