import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { API_URL } from '../../env';
import { Observable, ObservedValueOf, throwError } from 'rxjs';
import { IMail } from './mail.model';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../user/user.model';

@Injectable({providedIn: 'root'})
export class MailAPI implements OnInit {

  userService = inject(UserService);

  curUser : IUser | null = null;

  constructor(private http : HttpClient) {
  }

  ngOnInit(): void {
      this.userService.currentUser.subscribe(theUser => this.curUser = theUser);
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(() => new Error(err.message || 'Error: Unable to complete request.'));
       
  }

  getFolder(folder : string) : Observable<HttpResponse<IMail[]>> {
    let the_token = localStorage.getItem("token");
    if (the_token == null) {
      the_token = "";
    }
    return this.http.get<IMail[]>(`${API_URL}/api/load-emails/${folder}`, {observe: 'response', withCredentials: true, headers: new HttpHeaders({
      Authorization: `Bearer ${the_token}`
    })})
    .pipe();
  }

  getFolderTopline(folder : string) : Observable<HttpResponse<IMail[]>> {
    let the_token = localStorage.getItem("token");
    if (the_token == null) {
      the_token = "";
    }
    return this.http.get<IMail[]>(`${API_URL}/api/load-emails/topline/${folder}`, {observe: 'response', withCredentials: true, headers: new HttpHeaders({
      Authorization: `Bearer ${the_token}`
    })})
    .pipe();
  }

  getFolderToplineAfter(folder : string, after : string, before : string) : Observable<HttpResponse<IMail[]>> {
    let the_token = localStorage.getItem("token");
    if (the_token == null) {
      the_token = "";
    }
    return this.http.get<IMail[]>(`${API_URL}/api/load-emails/topline/${folder}/${after}/${before}`, {observe: 'response', withCredentials: true, headers: new HttpHeaders({
      Authorization: `Bearer ${the_token}`
    })})
    .pipe();
  }

  getEmail(folder : string, email_id : number) : Observable<HttpResponse<IMail>> {
    let the_token = localStorage.getItem("token");
    if (the_token == null) {
      the_token = "";
    }
    return this.http.get<IMail>(`${API_URL}/api/load-emails/${folder}/${email_id}`, {observe: 'response', withCredentials: true, headers: new HttpHeaders({
      Authorization: `Bearer ${the_token}`
    })}).pipe();
  }

  setEmailReadFlag(email_id : number, flag_value : boolean) {
    let the_token = localStorage.getItem("token");
    if (the_token == null) {
      the_token = "";
    }
    return this.http.put(`${API_URL}/api/${email_id}/flags/read`, {'read': flag_value.toString()}, {withCredentials: true, headers: new HttpHeaders({
      Authorization: `Bearer ${the_token}`
    })}).pipe();
  }

  setEmailDeletedFlag(email_id : number) {
    let the_token = localStorage.getItem("token");
    if (the_token == null) {
      the_token = "";
    }
    return this.http.put(`${API_URL}/api/${email_id}/flags/deleted`, {}, {withCredentials: true, headers: new HttpHeaders({
      Authorization: `Bearer ${the_token}`
    })}).pipe();
  }

}
