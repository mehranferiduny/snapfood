import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BasketService } from "./basket.service";
import { BasketDto } from "./dto/basket.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserAuth } from "src/common/decorators/auth.decorator";
import { TypeData } from "src/common/enum/type-data.enum";


@Controller("basket")
@ApiTags("Basket")
@UserAuth()
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  addTobasketItem(@Body() createBasketDto: BasketDto) {
    return this.basketService.addToBasketItem(createBasketDto);
  }

  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.basketService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, ) {
    return this.basketService.update(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.basketService.remove(+id);
  }
}
