import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductDetails } from 'app/shared/model/product-details.model';

@Component({
  selector: 'jhi-product-details-detail',
  templateUrl: './product-details-detail.component.html'
})
export class ProductDetailsDetailComponent implements OnInit {
  productDetails: IProductDetails;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productDetails }) => {
      this.productDetails = productDetails;
    });
  }

  previousState() {
    window.history.back();
  }
}
