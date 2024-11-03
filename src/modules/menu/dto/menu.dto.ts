import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class MenuDto {}
export class TypeMenuDto {
  @ApiProperty()
  @IsString()
  @Length(3,20)
  title:string
}
