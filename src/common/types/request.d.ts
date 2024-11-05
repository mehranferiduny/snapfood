import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity"
import { UserEntity } from "src/modules/user/entity/user.entity"



export {}
declare global {
    namespace Express {
        export interface Request {
            user?: UserEntity,
            suppliar?:SupplierEntity
        }
    }
}
// declare module "express-serve-static-core" {
//     export interface Request {
//         user?: {id:string}
//     }
// }