import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiInventorySharedModule } from 'app/shared/shared.module';
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsDetailComponent } from './product-details-detail.component';
import { ProductDetailsUpdateComponent } from './product-details-update.component';
import { ProductDetailsDeletePopupComponent, ProductDetailsDeleteDialogComponent } from './product-details-delete-dialog.component';
import { productDetailsRoute, productDetailsPopupRoute } from './product-details.route';

const ENTITY_STATES = [...productDetailsRoute, ...productDetailsPopupRoute];

@NgModule({
  imports: [DiInventorySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductDetailsComponent,
    ProductDetailsDetailComponent,
    ProductDetailsUpdateComponent,
    ProductDetailsDeleteDialogComponent,
    ProductDetailsDeletePopupComponent
  ],
  entryComponents: [ProductDetailsDeleteDialogComponent]
})
export class DiInventoryProductDetailsModule {}
