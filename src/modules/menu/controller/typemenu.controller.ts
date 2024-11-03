import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";

import { UpdateMenuDto } from "../dto/update-menu.dto";
import { MenuService } from "../service/menu.service";
import { MenuDto, TypeMenuDto } from "../dto/menu.dto";
import { TypeMenuService } from "../service/type.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { TypeData } from "src/common/enum/type-data.enum";
import { SppliarAuth } from "src/common/decorators/auth.decorator";

@Controller("TypeMenu")
@ApiTags("TypeMenu")
@SppliarAuth()
export class TypeMenuController {
  constructor(private readonly menuService: TypeMenuService) {}

  @Post()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)

  create(@Body() typeDto: TypeMenuDto) {
    return this.menuService.create(typeDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(":id")
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  update(@Param("id" ,ParseIntPipe) id: number, @Body() typeDto: TypeMenuDto) {
    return this.menuService.update(id, typeDto);
  }

  @Delete(":id")
  remove(@Param("id",ParseIntPipe) id: number) {
    return this.menuService.remove(id);
  }
}
