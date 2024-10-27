import { FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from "multer"


export function UpladFileS3(filedName:string){
  return class UploadUtilty extends FileInterceptor(filedName,{
    storage:memoryStorage()
  }){}
}