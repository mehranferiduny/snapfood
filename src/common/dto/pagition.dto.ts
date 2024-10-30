import { ApiPropertyOptional } from "@nestjs/swagger";

export class PagitionDto{
  @ApiPropertyOptional({default:1})
  page:number

  @ApiPropertyOptional({default:10})
  limit:number

}