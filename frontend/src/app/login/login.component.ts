import { Component, inject } from '@angular/core';
import { IUser, NewUser } from '../entities/user/user.model';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common'
import { UserAPI } from '../entities/user/user-api.service';
import { finalize, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ FormsModule ]
})
export class LoginComponent {

  model : NewUser = {username: "", password: "", id: null, email_address: "", email_password: "", smtp_server: "", smtp_port: 0, imap_server: ""}
  submitted = false;
  userAPI = inject(UserAPI);
  userService = inject(UserService);

  onSubmit() {
    this.subscribeToSaveResponse(this.userAPI.loginUser(this.model));
  }

  private subscribeToSaveResponse(result : Observable<HttpResponse<IUser>>) : void {
    result.pipe(finalize(() => this.submitted = true)).subscribe({
      next: cur_user => this.loginUser(cur_user.body!),
      error: () => alert("Please check your username or password."),
    });
  }

  loginUser(user : IUser) : void {
    alert(`Welcome ${user.username}`);
    this.userService.setCurrentUser(user);
  }

}
