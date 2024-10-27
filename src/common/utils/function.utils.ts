export function isBoolean(values:any){
  return ["true",true,"false",false].includes(values)
}
export function toBoolean(values:any){
  return [true,"true"].includes(values) ?true
  :[false,"fales"].includes(values)?false
  :values
}