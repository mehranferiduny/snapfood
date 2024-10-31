import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsIdentityCard, IsMobilePhone, Length } from "class-validator"

export class SinUpSupplierDto {


  @ApiProperty()
  @Length(3,50)
  mangaer_name:string

  @ApiProperty()
  @Length(3,50)
  mangaer_family:string

  @ApiProperty()
  @IsMobilePhone("fa-IR",{},{message:"phone number invalid!"})
  phone:string

  @ApiProperty()
  city:string

  @ApiProperty()
  @Length(3,50)
  store_name:string

  @ApiProperty()
  categooryId:number


  @ApiProperty()
  invait_code:string

}

export class SuppliarInfoDto{
   @ApiProperty()
   @IsEmail()
   email:string

   @ApiProperty()
   @IsIdentityCard("IR")
   national_code:string
}
export class SuppliarUploadDocDto{
   @ApiProperty({format:"binary"})
   acsseptDoc:string

   @ApiProperty({format:"binary"})
   image:string
}
export class SuppliarUploadContractDto{
   @ApiProperty({format:"binary"})
   contract:string

}