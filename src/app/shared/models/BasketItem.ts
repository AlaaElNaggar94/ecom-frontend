export interface IBasket {
  id: string;
  basketItems: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category: string;
}

export class Basket implements IBasket {
  id = 'basket-' + Math.random().toString(36).substring(2, 9); // توليد ID عشوائي للسلة الجديدة
  basketItems: IBasketItem[] = [];
}