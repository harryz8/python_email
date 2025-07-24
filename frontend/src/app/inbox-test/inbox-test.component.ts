import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { MailAPI } from '../entities/mail/mail-api.service';
import { IMail } from '../entities/mail/mail.model';

@Component({
  selector: 'app-inbox-test',
  standalone: true,
  imports: [],
  templateUrl: './inbox-test.component.html',
  styleUrl: './inbox-test.component.scss'
})
export class InboxTestComponent implements OnInit {

  mailService = inject(MailAPI);

  inbox : IMail[] | null = null;

  ngOnInit(): void {
      this.mailService.getFolder("inbox").subscribe(mail => this.inbox=mail.body!);
  }

}
