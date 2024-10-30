import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeepPartial, Repository } from 'typeorm';
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
      const {Location,Key}=await this.s3Service.uploadFile(image,"snapfood-category")
      let parent:CategoryEntity=null;
      if(parentId && !isNaN(parentId)){
        parent=await this.findOneById(+parentId)
      }
      await this.categoryRepository.insert({
        title,
        slug,
        show,
        image:Location,
        imageKey:Key,
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

  async findByslug(slug:string){
  
    const catagoorySlug=await this.categoryRepository.findOne({
      where:{slug},
      relations:{childern:true}
    })
    
    if(!catagoorySlug) throw new NotFoundException("slug catgoory slug notFound!")
    return {
      catagoorySlug
    }
  }

 async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({slug});
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto,image:Express.Multer.File) {

  const {parentId,show,slug,title}=updateCategoryDto
  const categoory=await this.findOneById(id)
  const updateObject:DeepPartial<CategoryEntity>={}


  if(image){
    const {Location,Key}= await this.s3Service.uploadFile(image,"snapfood-category")
    if(Location){
      updateObject['image']=Location
      updateObject['imageKey']=Key
      if(categoory?.imageKey){
      await this.s3Service.deleteFile(categoory?.imageKey)
    }}
  }

  if(title)updateObject["title"]=title;
  if(isBoolean(show))updateObject["show"]=toBoolean(show);

  if(parentId && !isNaN(parseInt(parentId.toString()))){
     const categooryParent=await this.findOneById(+parentId)
     updateObject["parentId"]=categooryParent.id;
  }

  if(slug){
    const categoorySlug=await this.findOneBySlug(slug);
    if(categoorySlug && categoorySlug.id !== id){
      throw new ConflictException("categoory alredy exist")
    }
    updateObject['slug']=slug
  }
  
    await this.categoryRepository.update({id},updateObject)

    return {
      message:"updated sacsesfully"
    }
 
  }

  async remove(id: number) {
    await this.findOneById(id)
    await this.categoryRepository.delete(id)
    return {
      message:"delete category successfully"
    }
  }
}
