import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { isBoolean, toBoolean } from 'src/common/utils/function.utils';
import { PagitionDto } from 'src/common/dto/pagition.dto';
import { PagitionGeneritor, PagitionSolver } from 'src/common/utils/pagition.utils';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository:Repository<CategoryEntity>,
    private readonly s3Service:S3Service
  ){}

  async create(createCategoryDto: CreateCategoryDto,image:Express.Multer.File) {
  

  

    let {title,slug,show,parentId}=createCategoryDto

    const category=await this.findOneBySlug(slug)
    if(category) throw new ConflictException("already categoory exist!")

      if(isBoolean(show)){
        show=toBoolean(show)
      }
      const {Location}=await this.s3Service.uploadFile(image,"snapfood-category")
      let parent:CategoryEntity=null;
      if(parentId && !isNaN(parentId)){
        parent=await this.findOneById(+parentId)
      }
      await this.categoryRepository.insert({
        title,
        slug,
        show,
        image:Location,
        parentId:parent?.id

      })
     return{
      message:"created category sacsesfuly"
     }
  }

  async findAll(paginationDto:PagitionDto) {
    const {limit,page,skip}=PagitionSolver(paginationDto)
    const [categooris,count]=await this.categoryRepository.findAndCount({
      where:{},
      relations:{
        parent:true
      },
      select:{
        parent:{
          title:true
        }
      },
      skip,
      take:limit,
      order:{id:"DESC"}
    })
    return {
      pagination:PagitionGeneritor(page,limit,count),
      categooris
    };
  }

  async findOneById(id: number) {
    const category=await this.categoryRepository.findOneBy({id})
    if(!category) throw new NotFoundException("not found category!!")
      return category 
  }
 async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({slug});
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
