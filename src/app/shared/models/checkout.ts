
export interface IDeliveryMethod {
  id: number;
  name: string; // 👈 تغيير shortName إلى name ليطابق الباك إند
  deliveryTime: string;
  description: string;
  price: number;
}


