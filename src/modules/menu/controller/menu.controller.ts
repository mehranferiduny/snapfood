import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseIntPipe,
} from "@nestjs/common";

import { UpdateMenuDto } from "../dto/update-menu.dto";
import { MenuService } from "../service/menu.service";
import { MenuDto } from "../dto/menu.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SppliarAuth } from "src/common/decorators/auth.decorator";
import { TypeData } from "src/common/enum/type-data.enum";
import { UpladFileS3 } from "src/common/interceptor/upload-file.interceptor";
import { MIME_TYPES } from "src/common/enum/type-image.enum";
import { SkipAuth } from "src/common/decorators/skip-auth.decorator";

@Controller("menu")
@ApiTags("Menu")
@SppliarAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}


  @Post()
  @ApiConsumes(TypeData.MultipartData)
  @UseInterceptors(UpladFileS3("image"))
  createMenu(@Body() menuDto:MenuDto,  @UploadedFile(
    new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({maxSize:2 * 1024 * 1024}),
        new FileTypeValidator({fileType:`(${MIME_TYPES.JPG}|${MIME_TYPES.PNG})|${MIME_TYPES.JPEG}`})
      ]
    })
  )  image:Express.Multer.File ){
    return this.menuService.createItemMenu(menuDto,image)
  }
  @Patch("/:id")
  @ApiConsumes(TypeData.MultipartData)
  @UseInterceptors(UpladFileS3("image"))
  updateMenu(@Param('id',ParseIntPipe)id:number,@Body() menuDto:UpdateMenuDto,  @UploadedFile(
    new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({maxSize:2 * 1024 * 1024}),
        new FileTypeValidator({fileType:`(${MIME_TYPES.JPG}|${MIME_TYPES.PNG})|${MIME_TYPES.JPEG}`})
      ]
    })
  )  image:Express.Multer.File ){
    return this.menuService.update(menuDto,image,id)
  }



  @Get('all-by-slug/:slug')
  @SkipAuth()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  findAll(@Param('slug') slug:string){
    return this.menuService.findAll(slug)
  }


  @Get('menuItem/:id')
  @SkipAuth()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  findOne(@Param('id',ParseIntPipe) id:number){
    return this.menuService.findOne(id)
  }
  @Get('Delete-menuItem/:id')
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  remove(@Param('id',ParseIntPipe) id:number){
    return this.menuService.remove(id)
  }
}
