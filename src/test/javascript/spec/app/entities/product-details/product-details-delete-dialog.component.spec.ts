import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DiInventoryTestModule } from '../../../test.module';
import { ProductDetailsDeleteDialogComponent } from 'app/entities/product-details/product-details-delete-dialog.component';
import { ProductDetailsService } from 'app/entities/product-details/product-details.service';

describe('Component Tests', () => {
  describe('ProductDetails Management Delete Component', () => {
    let comp: ProductDetailsDeleteDialogComponent;
    let fixture: ComponentFixture<ProductDetailsDeleteDialogComponent>;
    let service: ProductDetailsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiInventoryTestModule],
        declarations: [ProductDetailsDeleteDialogComponent]
      })
        .overrideTemplate(ProductDetailsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductDetailsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductDetailsService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
