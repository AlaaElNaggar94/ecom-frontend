import { IPhoto } from "./photo";

// 2. واجهة المنتج (Product)
export interface IProduct {
  id: number;
  name: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  categoryId: number;
  categoryName: string;
  photos: IPhoto[];
}
