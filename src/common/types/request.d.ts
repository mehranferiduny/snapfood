import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity"



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