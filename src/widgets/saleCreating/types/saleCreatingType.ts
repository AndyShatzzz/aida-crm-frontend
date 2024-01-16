export interface Product {
  productId: string;
  name: string;
  price: number;
  counter: number;
  cost: number;
  _id?: string;
}

export type InitialProducts = Product[];
