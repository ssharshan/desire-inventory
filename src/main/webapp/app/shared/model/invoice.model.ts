import { Moment } from 'moment';
import { IOrder } from 'app/shared/model/order.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { InvoiceStatus } from 'app/shared/model/enumerations/invoice-status.model';

export interface IInvoice {
  id?: number;
  date?: Moment;
  amount?: number;
  discount?: number;
  status?: InvoiceStatus;
  orders?: IOrder[];
  customer?: ICustomer;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public date?: Moment,
    public amount?: number,
    public discount?: number,
    public status?: InvoiceStatus,
    public orders?: IOrder[],
    public customer?: ICustomer
  ) {}
}
