import {
  Controller,
  Post,
  Body,
  Put,
  UseInterceptors,
  UploadedFiles,

} from "@nestjs/common";
import { SinUpSupplierDto, SuppliarInfoDto, SuppliarUploadContractDto, SuppliarUploadDocDto } from "./dto/supplier.dto";
import { SupplierService } from "./supplier.service";
import { checkOtpDto } from "../auth/dto/auth.dto";
import { SppliarAuth } from "src/common/decorators/auth.decorator";
import { ApiConsumes } from "@nestjs/swagger";
import { TypeData } from "src/common/enum/type-data.enum";
import { UpladFileDocS3 } from "src/common/interceptor/upload-file.interceptor";
import { ContractTypeFile, DocumentTypeFile, ImageTypeFile } from "./types/document.type";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";


@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post("signUp")
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  signUp(@Body() signUpDto: SinUpSupplierDto) {
    return this.supplierService.sinUp(signUpDto)
    
  }
  @Post("check-otp")
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  checkOtp(@Body() checkOtpDto: checkOtpDto) {
    return this.supplierService.checkOtp(checkOtpDto)
    
  }
  @Post("supplimented-info")
  @SppliarAuth()
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  supplimentedInfo(@Body() suppliarInfo: SuppliarInfoDto) {
    return this.supplierService.supplemntyInfomation(suppliarInfo)
    
  }

  @Put("/document-upload")
  @ApiConsumes(TypeData.MultipartData)
  @SppliarAuth()
  @UseInterceptors(UpladFileDocS3([{name:"acsseptDoc",maxCount:1},{name:"image",maxCount:1}]))
  uploadDocument(
    @Body() suppliarDocDto:SuppliarUploadDocDto,
    @UploadedFiles() files:DocumentTypeFile)
    {

      return this.supplierService.uploadDocSuppliar(suppliarDocDto,files)
  }
  @Put("/contract-upload")
  @ApiConsumes(TypeData.MultipartData)
  @SppliarAuth()
  @UseInterceptors(UpladFileDocS3([{name:"contract",maxCount:1}]))
  ContractDocument(
    @Body() suppliarDcontractDto:SuppliarUploadContractDto,
    @UploadedFiles() files:ContractTypeFile)
    {

      return this.supplierService.uploadConcract(files)
  }
  @Put("/update-supliar")
  @ApiConsumes(TypeData.MultipartData,TypeData.UrlEncoded,TypeData.Json)
  @SppliarAuth()
  @UseInterceptors(UpladFileDocS3([{name:"image_back",maxCount:1},{name:"logo",maxCount:1}]))
  updateSupliar(
    @Body() suppliarUpdateDto:UpdateSupplierDto,
    @UploadedFiles() files:ImageTypeFile)
    {

      return this.supplierService.UpdateSupliar(suppliarUpdateDto,files)
  }

 

  
}
