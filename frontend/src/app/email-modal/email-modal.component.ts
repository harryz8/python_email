import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IMail } from '../entities/mail/mail.model';
import { MailAPI } from '../entities/mail/mail-api.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-email-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './email-modal.component.html',
  styleUrl: './email-modal.component.scss'
})
export class EmailModalComponent implements OnInit {

  mailService = inject(MailAPI);

  @Input() mail_id : number | null = null;
  @Input() folder : string | null = null;
  mail : IMail | null = null;
  isLoading = false;
  faSpinner = faSpinner;

  constructor(public activeModal : NgbActiveModal) {
  }

  ngOnInit() {
    this.isLoading = true;
    if (this.folder !== null && this.mail_id !== null) {
      this.mailService.getEmail(this.folder, this.mail_id).subscribe(mail => this.finished(mail.body!));
    }
  }

  finished(mail : IMail) {
    this.mail = mail;
    this.isLoading = false;
  }

}
