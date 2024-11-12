export type FoodList={
  foodId:number,
  name:string,
  discription?:string,
  image?:string,
  discount:number,
  count:number,
  price:number,
  total_amount:number,
  discount_amount:number,
  payment_amount:number,
  discount_code:number,
  suppliarId:number,
  suppliarName?:string,
  suppliarImage?:string,
}

export type BasketType={
  total_amount:number,
  payment_amount:number,
  total_discount_amount:number,
  foodList:FoodList[],
  generalDiscountDitel:any
}
