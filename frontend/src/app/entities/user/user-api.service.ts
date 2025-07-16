import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { API_URL } from '../../env';
import { Observable, throwError } from 'rxjs';
import { IUser, NewUser } from './user.model';

@Injectable({providedIn: 'root'})
export class UserAPI {
  constructor(private http : HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => new Error(err.message || 'Error: Unable to complete request.'));
       
  }

  registerUser(new_user : NewUser): Observable<HttpResponse<IUser>> {
    return this.http.post<IUser>(`${API_URL}/api/register-user`, new_user, { observe: 'response' })
  }

}
