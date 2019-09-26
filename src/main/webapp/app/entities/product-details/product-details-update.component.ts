import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductDetails, ProductDetails } from 'app/shared/model/product-details.model';
import { ProductDetailsService } from './product-details.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-product-details-update',
  templateUrl: './product-details-update.component.html'
})
export class ProductDetailsUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  editForm = this.fb.group({
    id: [],
    weight: [],
    mrp: [null, [Validators.required]],
    distributorPrice: [],
    distributorMargin: [],
    lotCount: [],
    available: [],
    shortcut: [],
    product: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productDetailsService: ProductDetailsService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productDetails }) => {
      this.updateForm(productDetails);
    });
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productDetails: IProductDetails) {
    this.editForm.patchValue({
      id: productDetails.id,
      weight: productDetails.weight,
      mrp: productDetails.mrp,
      distributorPrice: productDetails.distributorPrice,
      distributorMargin: productDetails.distributorMargin,
      lotCount: productDetails.lotCount,
      available: productDetails.available,
      shortcut: productDetails.shortcut,
      product: productDetails.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productDetails = this.createFromForm();
    if (productDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.productDetailsService.update(productDetails));
    } else {
      this.subscribeToSaveResponse(this.productDetailsService.create(productDetails));
    }
  }

  private createFromForm(): IProductDetails {
    return {
      ...new ProductDetails(),
      id: this.editForm.get(['id']).value,
      weight: this.editForm.get(['weight']).value,
      mrp: this.editForm.get(['mrp']).value,
      distributorPrice: this.editForm.get(['distributorPrice']).value,
      distributorMargin: this.editForm.get(['distributorMargin']).value,
      lotCount: this.editForm.get(['lotCount']).value,
      available: this.editForm.get(['available']).value,
      shortcut: this.editForm.get(['shortcut']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductDetails>>) {
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

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }
}
