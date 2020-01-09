import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {createRequestOption} from '../utils/request-util';
import {SERVER_API_URL} from "../../app.constants";

@Injectable({providedIn: 'root'})
export class DashboardService {
  private dashboardUrl = SERVER_API_URL + 'api';

  constructor(private http: HttpClient) {
  }

  getEveryQuantity(): Observable<any[]> {
    return this.http.get<any[]>(this.dashboardUrl + '/dashboard/every-quantity', {
      params: {
        observe: 'response'
      },
      observe: 'response'
    }).pipe(map((res: HttpResponse<any[]>) => res.body));
  }

  getTableFinished(): Observable<any[]> {
    return this.http.get<any[]>(this.dashboardUrl + '/dashboard/table-finished', {
      params: {
        observe: 'response'
      },
      observe: 'response'
    }).pipe(map((res: HttpResponse<any[]>) => res.body));
  }

  getFieldFinished(): Observable<any[]> {
    return this.http.get<any[]>(this.dashboardUrl + '/dashboard/field-finished', {
      params: {
        observe: 'response'
      },
      observe: 'response'
    }).pipe(map((res: HttpResponse<any[]>) => res.body));
  }
}
