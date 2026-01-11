import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IMail, NewMail, MailClass } from '../entities/mail/mail.model';
import { MailAPI } from '../entities/mail/mail-api.service';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { IUser } from '../entities/user/user.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-email-modal',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, JsonPipe],
  templateUrl: './email-modal.component.html',
  styleUrl: './email-modal.component.scss'
})
export class EmailModalComponent implements OnInit {

  mailService = inject(MailAPI);
  userService = inject(UserService);
  
  curUser : IUser | null = null;
  @Input() mail_id : number | null = null;
  @Input() folder : string | null = null;
  mail : NewMail = {
      email_from : "",
      email_to : "",
      subject : "",
      content : "",
      date : (new Date(Date.now())).toISOString(),
      seen : false,
      answered : false,
      flagged : false,
      draft : false,
    };
  isLoading = false;
  faSpinner = faSpinner;
  faPaperPlane = faPaperPlane;

  constructor(public activeModal : NgbActiveModal) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.userService.currentUser.subscribe(theUser => this.curUser = theUser);
    if (this.folder !== null && this.mail_id !== null) {
      this.mailService.getEmail(this.folder, this.mail_id).subscribe(mail => this.finished(mail.body!));
    }
    else if (this.curUser !== null) {
      this.isLoading = false;
      this.mail.email_from = this.curUser.email_address;
    }
  }

  finished(mail : IMail) {
    this.mail.email_from = mail.email_from;
    this.mail.email_to = mail.email_to;
    this.mail.subject = mail.subject;
    this.mail.content = mail.content;
    this.mail.date = mail.date;
    this.mail.seen = mail.seen;
    this.mail.answered = mail.answered;
    this.mail.flagged = mail.flagged;
    this.mail.draft = mail.draft;
    this.isLoading = false;
  }

  onSubmit() {
    this.mailService.postEmail(this.mail).subscribe({
      next: () => this.activeModal.close('Email sucessfully sent'),
      error: () => alert("Server Error encountered: Please try again later.")
    });
  }

}
