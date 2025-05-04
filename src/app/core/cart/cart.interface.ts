import { Clothes } from '../clothes/clothes.interface';

export interface CartItem {
  product: Clothes;
  quantity: number;
}
