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
import { FeedbackDto, MenuDto } from "../dto/menu.dto";
import { FeedbackService } from "../service/feedback.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { TypeData } from "src/common/enum/type-data.enum";
import { UserAuth } from "src/common/decorators/auth.decorator";

@Controller("Feedback")
@ApiTags('FeedBack')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('feedback/:id')
  @ApiConsumes(TypeData.UrlEncoded,TypeData.Json)
  @UserAuth()
  create(@Param('id' , ParseIntPipe) id:number,@Body() feedDto:FeedbackDto ){
    return this.feedbackService.createFeedBack(feedDto,id)

  }

}
