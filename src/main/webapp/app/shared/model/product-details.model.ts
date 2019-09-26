import { IProduct } from 'app/shared/model/product.model';

export interface IProductDetails {
  id?: number;
  weight?: number;
  mrp?: number;
  distributorPrice?: number;
  distributorMargin?: number;
  lotCount?: number;
  available?: number;
  shortcut?: string;
  product?: IProduct;
}

export class ProductDetails implements IProductDetails {
  constructor(
    public id?: number,
    public weight?: number,
    public mrp?: number,
    public distributorPrice?: number,
    public distributorMargin?: number,
    public lotCount?: number,
    public available?: number,
    public shortcut?: string,
    public product?: IProduct
  ) {}
}
