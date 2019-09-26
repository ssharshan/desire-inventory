import { Moment } from 'moment';
import { IProductDetails } from 'app/shared/model/product-details.model';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface IOrder {
  id?: number;
  date?: Moment;
  amount?: number;
  qty?: number;
  discount?: number;
  product?: IProductDetails;
  invoice?: IInvoice;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public date?: Moment,
    public amount?: number,
    public qty?: number,
    public discount?: number,
    public product?: IProductDetails,
    public invoice?: IInvoice
  ) {}
}
