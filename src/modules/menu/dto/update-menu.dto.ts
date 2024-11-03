import { PartialType } from "@nestjs/swagger";
import { MenuDto,TypeMenuDto } from "./menu.dto";

export class UpdateMenuDto extends PartialType(MenuDto) {}
