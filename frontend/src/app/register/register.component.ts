import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUser, NewUser } from '../entities/user/user.model';
import { UserAPI } from '../entities/user/user-api.service';
import { finalize, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  model : NewUser = {username: "", password: "", id: null, email_address: "", email_password: "", smtp_server: "", smtp_port: 0, imap_server: ""}
  submitted = false;
  userAPI = inject(UserAPI);

  onSubmit() {
    this.subscribeToSaveResponse(this.userAPI.registerUser(this.model));
  }

  private subscribeToSaveResponse(result : Observable<HttpResponse<IUser>>) : void {
    result.pipe(finalize(() => this.submitted = true)).subscribe({
      next: () => history.back(),
      error: () => alert("Error"),
    });
  }

}
