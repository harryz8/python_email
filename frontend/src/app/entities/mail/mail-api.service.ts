import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { API_URL } from '../../env';
import { Observable, throwError } from 'rxjs';
import { IMail } from './mail.model';

@Injectable({providedIn: 'root'})
export class UserAPI {
  constructor(private http : HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => new Error(err.message || 'Error: Unable to complete request.'));
       
  }

  getFolder(folder : string) : Observable<HttpResponse<IMail[]>> {
    return this.http.get<IMail[]>(`${API_URL}/api/load-emails/${folder}`, {observe: 'response'})
    .pipe()
  }

}
