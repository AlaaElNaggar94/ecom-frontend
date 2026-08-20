// Interface الخاص بالـ Address في حالة الشحن
export interface IAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

// Interface البيانات المطلوبة لإرسال الطلب (Payload) للـ API
export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shippingAddress: IAddress;
}

// Interface للبنود المكونة للطلب (استجابة الـ API)
export interface IOrderItem {
  productId: number;
  productName: string;
  mainImage: string;
  price: number;
  quantity: number;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  city: string;
  zipCode: string;
  street: string;
  state: string;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: string; // أو Date إذا أردت تحويله لاحقاً
  subTotal: number;
  total: number;
  status: string;
  shippingAddress: IShippingAddress;
  deliveryMethod: string;
  orderItems: IOrderItem[];
}
