import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express"
import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"
import { memoryStorage } from "multer"


export function UpladFileS3(filedName:string){
  return class UploadUtilty extends FileInterceptor(filedName,{
    storage:memoryStorage()
  }){}
}
export function UpladFileDocS3(fildName:MulterField[]){
  return class UploadUtilty extends FileFieldsInterceptor(fildName,{
    storage:memoryStorage()
  }){}
}