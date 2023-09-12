export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  VAT: number;
  totalPrice: number;
}

export interface IPayment {
  id: string;
  price: number;
  VAT: number;
  totalPrice: number;
  products: IProduct[];
}
