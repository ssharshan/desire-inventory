import { ICompany } from 'app/shared/model/company.model';
import { ICategory } from 'app/shared/model/category.model';
import { IProductDetails } from 'app/shared/model/product-details.model';

export interface IProduct {
  id?: number;
  name?: string;
  shortcut?: string;
  cgst?: number;
  sgst?: number;
  hsn?: string;
  company?: ICompany;
  category?: ICategory;
  types?: IProductDetails[];
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public shortcut?: string,
    public cgst?: number,
    public sgst?: number,
    public hsn?: string,
    public company?: ICompany,
    public category?: ICategory,
    public types?: IProductDetails[]
  ) {}
}
