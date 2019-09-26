import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.DiInventoryCompanyModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.DiInventoryCategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.DiInventoryProductModule)
      },
      {
        path: 'product-details',
        loadChildren: () => import('./product-details/product-details.module').then(m => m.DiInventoryProductDetailsModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.DiInventoryOrderModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.DiInventoryInvoiceModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.DiInventoryCustomerModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DiInventoryEntityModule {}
