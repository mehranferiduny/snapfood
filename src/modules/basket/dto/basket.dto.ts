import { ApiProperty } from "@nestjs/swagger";

export class BasketDto {
  @ApiProperty()
  foodId:number
}
export class DiscountDto {
  @ApiProperty()
  code:string
}
