import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class User {
  constructor(private http : HttpClient) {
  }

}
