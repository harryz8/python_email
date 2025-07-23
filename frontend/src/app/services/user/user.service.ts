import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../entities/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSave = new BehaviorSubject<null | IUser>(null);
  currentUser = this.userSave.asObservable();

  setCurrentUser(user : IUser) {
    this.userSave.next(user)
  }

  clearCurrentUser() {
    this.userSave.next(null)
  }
}
