import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { SinUpSupplierDto } from "./supplier.dto";
import { IsEnum, IsNumberString, Length } from "class-validator";
import { PickSupliar } from "../enum/status.enum";

export class UpdateSupplierDto {
  
  @ApiProperty({format:"binary"})
  image_back:string

  @ApiProperty({format:"binary"})
  logo:string

  @ApiProperty()
  @Length(5,100)
  discription:string

  @ApiProperty({enum:PickSupliar,nullable:true})
  @IsEnum(PickType)
  pick:string
}
