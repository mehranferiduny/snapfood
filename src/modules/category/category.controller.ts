import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { UpladFileS3 } from 'src/common/interceptor/upload-file.interceptor';
import { MIME_TYPES } from 'src/common/enum/type-image.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
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

      return{
        image,
        createCategoryDto
      }
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
