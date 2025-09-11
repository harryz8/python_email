import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { MailAPI } from '../entities/mail/mail-api.service';
import { IMail } from '../entities/mail/mail.model';
import { IUser } from '../entities/user/user.model';
import { EmailComponent } from "../email/email.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-inbox-test',
  standalone: true,
  imports: [EmailComponent, FontAwesomeModule, NgClass],
  templateUrl: './inbox-test.component.html',
  styleUrl: './inbox-test.component.scss'
})
export class InboxTestComponent implements OnInit {

  mailService = inject(MailAPI);
  userService = inject(UserService);

  inbox : IMail[] | null = null;
  isLoading = false;
  the_user : IUser | null = null;
  faSpinner = faSpinner;

  ngOnInit(): void {
      this.isLoading = true;
      this.mailService.getFolderTopline("inbox").subscribe(mail => this.finished(mail.body!));
      this.userService.currentUser.subscribe(cur_user => this.the_user = cur_user);
  }

  finished(mail : IMail[]) {
    this.inbox = mail.sort((mail1, mail2) => {
      let date1 = new Date(mail1.date);
      let date2 = new Date(mail2.date);
      if (date1 > date2) {
        return -1;
      }
      if (date2 > date1) {
        return 1;
      }
      return 0;
    });
    this.isLoading = false;
  }

}
