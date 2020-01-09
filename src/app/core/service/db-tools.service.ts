import {Injectable} from '@angular/core';
import {SERVER_API_URL} from "../../app.constants";
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDataCatalog} from "@core/model/data-catalog.model";
import {createRequestOption} from "@core/utils/request-util";

@Injectable({providedIn: 'root'})
export class DbToolsService {
  public resourceUrl = SERVER_API_URL + 'api/db-tools';

  constructor(protected http: HttpClient) {
  }

  query(req?: any): Observable<HttpResponse<IDataCatalog[]>> {
    return this.http
      .get<IDataCatalog[]>(`${this.resourceUrl}/${req.dataCatalogId}/${req.databaseConnectionId}`, {
        params: null,
        observe: 'response'
      });
  }

  browseData(req?: any): Observable<HttpResponse<any[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<any[]>(`${this.resourceUrl}/browse/${req.dataCatalogId}`, {
        params: options,
        observe: 'response'
      });
  }
}
