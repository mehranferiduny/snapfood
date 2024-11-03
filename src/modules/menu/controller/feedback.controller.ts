import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { UpdateMenuDto } from "../dto/update-menu.dto";
import { MenuService } from "../service/menu.service";
import { MenuDto } from "../dto/menu.dto";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

}
