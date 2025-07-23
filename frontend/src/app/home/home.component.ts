import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { IUser } from '../entities/user/user.model';
import { LoginComponent } from '../login/login.component';
import { InboxTestComponent } from "../inbox-test/inbox-test.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, InboxTestComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userService = inject(UserService)
  currentUser : IUser | null = null;

  ngOnInit() : void {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

}
