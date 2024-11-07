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
import { BasketDto, DiscountDto } from "./dto/basket.dto";
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

  @Post('addDiscount')
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  addDiscount(@Body() discountDto: DiscountDto) {
    return this.basketService.addDiscountBasket(discountDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.basketService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, ) {
    return this.basketService.update(+id);
  }

  @Delete('deleteDiscount')
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  removeDiscountInBasket(@Body() discountDto: DiscountDto) {
    return this.basketService.removeDiscountBasket(discountDto);
  }
  @Delete()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  removeItemInBasket(@Body() BasketDto: BasketDto) {
    return this.basketService.removeItemInBasket(BasketDto);
  }
}
