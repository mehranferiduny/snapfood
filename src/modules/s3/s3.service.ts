import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { extname } from "path";


@Injectable()
export class S3Service{
  private readonly s3:S3;
  constructor(){
    console.log(process.env.S3_SECRET_KEY)
    this.s3=new S3({
      credentials:{
        accessKeyId:process.env.S3_SECRET_KEY,
        secretAccessKey:process.env.S3_SECRET_KEY
      },
      endpoint:process.env.S3_API_ENDPOINT,
      region:"default"

    })
  }
  async uploadFile(file:Express.Multer.File,FolderName:string){
    const ext=extname(file.originalname)
    return await this.s3.upload({
      Bucket:process.env.S3_BUCKET_NAME,
      Key:`${FolderName}/${Date.now()}${ext}`,
      Body:file.buffer
    }).promise()

  }
  async deleteFile(Key:string){
    
    return await this.s3.deleteObject({
      Bucket:process.env.S3_BUCKET_NAME,
      Key:decodeURI(Key),
  
    }).promise()

  }
}