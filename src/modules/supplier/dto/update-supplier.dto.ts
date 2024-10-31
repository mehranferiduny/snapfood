import { PartialType } from "@nestjs/swagger";
import { CreateSupplierDto } from "./supplier.dto";

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}
