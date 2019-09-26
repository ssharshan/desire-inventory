import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiInventoryTestModule } from '../../../test.module';
import { ProductDetailsDetailComponent } from 'app/entities/product-details/product-details-detail.component';
import { ProductDetails } from 'app/shared/model/product-details.model';

describe('Component Tests', () => {
  describe('ProductDetails Management Detail Component', () => {
    let comp: ProductDetailsDetailComponent;
    let fixture: ComponentFixture<ProductDetailsDetailComponent>;
    const route = ({ data: of({ productDetails: new ProductDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DiInventoryTestModule],
        declarations: [ProductDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
