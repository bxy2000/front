import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


import { IDataCatalog } from '@core/model/data-catalog.model';
import {SERVER_API_URL} from "../../app.constants";
import {createRequestOption} from "@core/utils/request-util";

type EntityResponseType = HttpResponse<IDataCatalog>;
type EntityArrayResponseType = HttpResponse<IDataCatalog[]>;

@Injectable({ providedIn: 'root' })
export class DataCatalogService {
  // public resourceUrl = SERVER_API_URL + 'api/data-catalogs';
  public resourceUrl = SERVER_API_URL + 'api/ext/data-catalogs';

  constructor(protected http: HttpClient) {}

  create(dataCatalog: IDataCatalog): Observable<EntityResponseType> {
    return this.http.post<IDataCatalog>(this.resourceUrl, dataCatalog, { observe: 'response' });
  }

  update(dataCatalog: IDataCatalog): Observable<EntityResponseType> {
    return this.http.put<IDataCatalog>(this.resourceUrl, dataCatalog, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDataCatalog>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDataCatalog[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  deleteBat(ids: number[]): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.resourceUrl}/deleteBat`, ids.join(','), { observe: 'response' });
  }

  findRelationship(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(SERVER_API_URL+`api/ext/relationship/${id}`, { observe: 'response' });
  }
}
