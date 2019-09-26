import { IProduct } from 'app/shared/model/product.model';

export interface ICompany {
  id?: number;
  name?: string;
  shortcut?: string;
  products?: IProduct[];
}

export class Company implements ICompany {
  constructor(public id?: number, public name?: string, public shortcut?: string, public products?: IProduct[]) {}
}
