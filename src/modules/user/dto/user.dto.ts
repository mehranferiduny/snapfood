import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsString, Length } from "class-validator";


export class UserSignUpDto{

  @ApiProperty()
  @IsMobilePhone('fa-IR',{},{message:"phone number invalid!"})
  phone:string
}

export class UpdateUserDto{
 
  @ApiProperty()
  @IsString()
  @Length(2,20)
  first_name:string
  @ApiProperty()
  @IsString()
  @Length(2,30)
  last_name:string

  @ApiPropertyOptional()
  @IsEmail()
  email:string
  
  @ApiPropertyOptional()
  @Length(7)
  invait_code:string


  @ApiProperty()
  @IsString()
  @Length(2,30)
  title:string
  @ApiProperty()
  @IsString()
  @Length(2,30)
  province:string
  @ApiProperty()
  @IsString()
  @Length(2,30)
  city:string
  @ApiProperty()
  address:string
  @ApiPropertyOptional({nullable:true})
  postal_code:string
 
}