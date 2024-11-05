import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class MenuDto {
  @ApiProperty()
  @IsString()
  @Length(5,30)
  name:string
  
  @ApiProperty()
  @IsString()
  @Length(5,150)
  description:string

  @ApiProperty({format:'binary'})
  image:string

  @ApiProperty()
  price:number

  @ApiProperty()
  discount:number
  @ApiProperty()
  foodTypeId:number

}
export class TypeMenuDto {
  @ApiProperty()
  @IsString()
  @Length(3,20)
  title:string
  @ApiPropertyOptional()
  @IsNumber()
  priority:number
}
