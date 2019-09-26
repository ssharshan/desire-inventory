import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductDetails } from 'app/shared/model/product-details.model';
import { ProductDetailsService } from './product-details.service';
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsDetailComponent } from './product-details-detail.component';
import { ProductDetailsUpdateComponent } from './product-details-update.component';
import { ProductDetailsDeletePopupComponent } from './product-details-delete-dialog.component';
import { IProductDetails } from 'app/shared/model/product-details.model';

@Injectable({ providedIn: 'root' })
export class ProductDetailsResolve implements Resolve<IProductDetails> {
  constructor(private service: ProductDetailsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductDetails> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductDetails>) => response.ok),
        map((productDetails: HttpResponse<ProductDetails>) => productDetails.body)
      );
    }
    return of(new ProductDetails());
  }
}

export const productDetailsRoute: Routes = [
  {
    path: '',
    component: ProductDetailsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'diInventoryApp.productDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductDetailsDetailComponent,
    resolve: {
      productDetails: ProductDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diInventoryApp.productDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductDetailsUpdateComponent,
    resolve: {
      productDetails: ProductDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diInventoryApp.productDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductDetailsUpdateComponent,
    resolve: {
      productDetails: ProductDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diInventoryApp.productDetails.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productDetailsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProductDetailsDeletePopupComponent,
    resolve: {
      productDetails: ProductDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'diInventoryApp.productDetails.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
