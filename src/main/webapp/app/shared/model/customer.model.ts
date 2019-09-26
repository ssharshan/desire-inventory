import { IInvoice } from 'app/shared/model/invoice.model';

export interface ICustomer {
  id?: number;
  name?: string;
  address?: string;
  lat?: number;
  longitude?: number;
  phone?: string;
  city?: string;
  state?: string;
  invoices?: IInvoice[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public lat?: number,
    public longitude?: number,
    public phone?: string,
    public city?: string,
    public state?: string,
    public invoices?: IInvoice[]
  ) {}
}
