import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { MailAPI } from '../entities/mail/mail-api.service';
import { IMail } from '../entities/mail/mail.model';
import { IUser } from '../entities/user/user.model';
import { EmailComponent } from "../email/email.component";

@Component({
  selector: 'app-inbox-test',
  standalone: true,
  imports: [EmailComponent],
  templateUrl: './inbox-test.component.html',
  styleUrl: './inbox-test.component.scss'
})
export class InboxTestComponent implements OnInit {

  mailService = inject(MailAPI);
  userService = inject(UserService);

  inbox : IMail[] | null = null;
  isLoading = false;
  the_user : IUser | null = null;

  ngOnInit(): void {
      this.isLoading = true;
      this.mailService.getFolder("inbox").subscribe(mail => this.finished(mail.body!));
      this.userService.currentUser.subscribe(cur_user => this.the_user = cur_user);
  }

  finished(mail : IMail[]) {
    this.inbox = mail;
    this.isLoading = false;
  }

}
