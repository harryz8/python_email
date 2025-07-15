import { Component } from '@angular/core';
import { NewUser } from '../entities/user/user.model';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule, JsonPipe]
})
export class LoginComponent {

  model : NewUser = {username: "", _password: "", id: null}
  submitted = false;

  onSubmit() {
    alert("submit")
    this.submitted = true;
  }

}
