import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductDetails } from 'app/shared/model/product-details.model';

type EntityResponseType = HttpResponse<IProductDetails>;
type EntityArrayResponseType = HttpResponse<IProductDetails[]>;

@Injectable({ providedIn: 'root' })
export class ProductDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/product-details';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/product-details';

  constructor(protected http: HttpClient) {}

  create(productDetails: IProductDetails): Observable<EntityResponseType> {
    return this.http.post<IProductDetails>(this.resourceUrl, productDetails, { observe: 'response' });
  }

  update(productDetails: IProductDetails): Observable<EntityResponseType> {
    return this.http.put<IProductDetails>(this.resourceUrl, productDetails, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductDetails[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
