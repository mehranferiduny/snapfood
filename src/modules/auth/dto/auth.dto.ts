import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsString, Length } from "class-validator";

export class sendOtpDto{
  @ApiProperty()
  @IsMobilePhone("fa-IR",{},{message:"Mobile Number Is Invalid"})
  mobile:string
}
export class checkOtpDto{
  @ApiProperty()
  @IsMobilePhone("fa-IR",{},{message:"Mobile Number Is Invalid"})
  mobile:string
  @ApiProperty()
  @IsString()
  @Length(5,5,{message:"Inccrent Code"})
  code:string
}