import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, Length, Max, Min } from "class-validator";

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

export class FeedbackDto {
  @ApiProperty()
  @IsInt({ message: 'Score must be an integer.' })
  @Min(1, { message: 'Score must be at least 1.' })
  @Max(5, { message: 'Score must be at most 5.' })
  score: number;

  @ApiProperty()
  @IsString()
  @Length(3,150,{message:'invalid comment!'})
  comment:string
}
