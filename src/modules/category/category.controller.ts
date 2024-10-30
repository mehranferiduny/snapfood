import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Query, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpladFileS3 } from 'src/common/interceptor/upload-file.interceptor';
import { MIME_TYPES } from 'src/common/enum/type-image.enum';
import { Pagition } from 'src/common/decorators/pagition.decorator';
import { PagitionDto } from 'src/common/dto/pagition.dto';
import { TypeData } from 'src/common/enum/type-data.enum';

@Controller('category')
@ApiTags("Categoory")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiConsumes(TypeData.MultipartData)
  @UseInterceptors(UpladFileS3("image"))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          new MaxFileSizeValidator({maxSize:2 * 1024 * 1024}),
          new FileTypeValidator({fileType:`(${MIME_TYPES.JPG}|${MIME_TYPES.PNG})|${MIME_TYPES.JPEG}`})
        ]
      })
    )  image:Express.Multer.File
    ,@Body() createCategoryDto: CreateCategoryDto) {

   
    return this.categoryService.create(createCategoryDto,image);
  }

  @Get()
  @Pagition()
  findAll(@Query() pagitionDto:PagitionDto) {
    return this.categoryService.findAll(pagitionDto);
  }
  @Get("/by-slug/:slug")

  findByslug(@Param("slug") slug:string) {
    return this.categoryService.findByslug(slug);
  }

 

  @Patch(':id')
  @ApiConsumes(TypeData.MultipartData)
  @UseInterceptors(UpladFileS3("image"))
  update(@Param('id',ParseIntPipe) id: number,
   @Body() updateCategoryDto: UpdateCategoryDto,
   @UploadedFile(
    new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({maxSize:2 * 1024 * 1024}),
        new FileTypeValidator({fileType:`(${MIME_TYPES.JPG}|${MIME_TYPES.PNG})|${MIME_TYPES.JPEG}`})
      ]
    })
  )  image:Express.Multer.File) {
    return this.categoryService.update(id, updateCategoryDto,image);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
