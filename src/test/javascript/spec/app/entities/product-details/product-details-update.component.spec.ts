import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DiInventoryTestModule } from '../../../test.module';
import { ProductDetailsUpdateComponent } from 'app/entities/product-details/product-details-update.component';
import { ProductDetailsService } from 'app/entities/product-details/product-details.service';
import { ProductDetails } from 'app/shared/model/product-details.model';

describe('Component Tests', () => {
  describe('ProductDetails Management Update Component', () => {
    let comp: ProductDetailsUpdateComponent;
    let fixture: ComponentFixture<ProductDetailsUpdateComponent>;
    let service: ProductDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiInventoryTestModule],
        declarations: [ProductDetailsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductDetails(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductDetails();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
