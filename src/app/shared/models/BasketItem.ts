import { v4 as uuidv4 } from 'uuid';



export interface IBasket {
  id: string;
  basketItems: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  name: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
}

// id = 'basket-' + Math.random().toString(36).substring(2, 9); // توليد ID عشوائي للسلة الجديدة
export class Basket implements IBasket {
  id = uuidv4(); // توليد ID عشوائي للسلة الجديدة
  basketItems: IBasketItem[] = [];
}