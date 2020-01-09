import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_FORMAT} from '@shared/constants/input.constants';
import {map} from 'rxjs/operators';

import {SERVER_API_URL} from '../../../app.constants';
import {createRequestOption} from '@core/utils/request-util';
import {IUserExtends} from '@core/model/user-extends.model';

@Injectable({providedIn: 'root'})
export class UserExtendsExtService {
  public resourceUrl = SERVER_API_URL + 'api/ext/user-extends';

  constructor(private http: HttpClient) {
  }

  create(userExtends: IUserExtends): Observable<HttpResponse<IUserExtends>> {
    const copy = this.convertDateFromClient(userExtends);
    return this.http
      .post<IUserExtends>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: HttpResponse<IUserExtends>) => this.convertDateFromServer(res)));
  }

  update(userExtends: IUserExtends): Observable<HttpResponse<IUserExtends>> {
    const copy = this.convertDateFromClient(userExtends);
    return this.http
      .put<IUserExtends>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: HttpResponse<IUserExtends>) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<HttpResponse<IUserExtends>> {
    return this.http
      .get<IUserExtends>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: HttpResponse<IUserExtends>) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<IUserExtends[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserExtends[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: HttpResponse<IUserExtends[]>) => this.convertDateArrayFromServer(res)));
  }

  resetPassword(login: any): Observable<any> {
    return this.http.post(this.resourceUrl + '/reset-password', login);
  }

  export(req?: any): Observable<Blob> {
    const options = createRequestOption(req);
    return this.http.get(this.resourceUrl + '/export', {params: options, responseType: 'blob'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  private convertDateFromClient(userExtends: IUserExtends): IUserExtends {
    const copy: IUserExtends = {...userExtends};
    return copy;
  }

  private convertDateFromServer(res: HttpResponse<IUserExtends>): HttpResponse<IUserExtends> {
    return res;
  }

  private convertDateArrayFromServer(res: HttpResponse<IUserExtends[]>): HttpResponse<IUserExtends[]> {
    return res;
  }
}
