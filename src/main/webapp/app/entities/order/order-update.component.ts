import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrder, Order } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { IProductDetails } from 'app/shared/model/product-details.model';
import { ProductDetailsService } from 'app/entities/product-details/product-details.service';
import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from 'app/entities/invoice/invoice.service';

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProductDetails[];

  invoices: IInvoice[];

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    qty: [null, [Validators.required]],
    discount: [],
    product: [],
    invoice: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderService: OrderService,
    protected productDetailsService: ProductDetailsService,
    protected invoiceService: InvoiceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ order }) => {
      this.updateForm(order);
    });
    this.productDetailsService
      .query({ filter: 'order-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IProductDetails[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductDetails[]>) => response.body)
      )
      .subscribe(
        (res: IProductDetails[]) => {
          if (!this.editForm.get('product').value || !this.editForm.get('product').value.id) {
            this.products = res;
          } else {
            this.productDetailsService
              .find(this.editForm.get('product').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IProductDetails>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IProductDetails>) => subResponse.body)
              )
              .subscribe(
                (subRes: IProductDetails) => (this.products = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.invoiceService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IInvoice[]>) => mayBeOk.ok),
        map((response: HttpResponse<IInvoice[]>) => response.body)
      )
      .subscribe((res: IInvoice[]) => (this.invoices = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(order: IOrder) {
    this.editForm.patchValue({
      id: order.id,
      date: order.date != null ? order.date.format(DATE_TIME_FORMAT) : null,
      amount: order.amount,
      qty: order.qty,
      discount: order.discount,
      product: order.product,
      invoice: order.invoice
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      amount: this.editForm.get(['amount']).value,
      qty: this.editForm.get(['qty']).value,
      discount: this.editForm.get(['discount']).value,
      product: this.editForm.get(['product']).value,
      invoice: this.editForm.get(['invoice']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProductDetailsById(index: number, item: IProductDetails) {
    return item.id;
  }

  trackInvoiceById(index: number, item: IInvoice) {
    return item.id;
  }
}
