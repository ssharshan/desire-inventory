import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductDetails } from 'app/shared/model/product-details.model';
import { ProductDetailsService } from './product-details.service';

@Component({
  selector: 'jhi-product-details-delete-dialog',
  templateUrl: './product-details-delete-dialog.component.html'
})
export class ProductDetailsDeleteDialogComponent {
  productDetails: IProductDetails;

  constructor(
    protected productDetailsService: ProductDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.productDetailsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'productDetailsListModification',
        content: 'Deleted an productDetails'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-product-details-delete-popup',
  template: ''
})
export class ProductDetailsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productDetails }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProductDetailsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.productDetails = productDetails;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/product-details', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/product-details', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
