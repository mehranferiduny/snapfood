import { PartialType } from "@nestjs/swagger";
import { SinUpSupplierDto } from "./supplier.dto";

export class UpdateSupplierDto extends PartialType(SinUpSupplierDto) {}
