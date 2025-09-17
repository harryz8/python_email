import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IMail } from '../entities/mail/mail.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter, faFlag, faEnvelope, faEnvelopeOpen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailModalComponent } from '../email-modal/email-modal.component'
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe, NgClass],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent implements OnInit {

  private modalService = inject(NgbModal);

  @Input() mail : IMail | null = null;
  @Output() seen_mail = new EventEmitter<boolean>();
  faUpRightAndDownLeftFromCenter = faUpRightAndDownLeftFromCenter;
  faDownLeftAndUpRightToCenter = faDownLeftAndUpRightToCenter;
  faFlag = faFlag;
  faTrashCan = faTrashCan;
  faEnvelope = faEnvelope;
  faEnvelopeOpen = faEnvelopeOpen;
  date : Date | null = null;

  constructor() {
    if (this.mail) {
      this.seen_mail.emit(this.mail.seen);
    }
    else {
      this.seen_mail.emit(false);
    }
  }

  ngOnInit(): void {
      if (this.mail !== null) {
        this.date = new Date(this.mail.date);
      }
  }

  openModal(): void {
    if (this.mail) {
      this.mail.seen = true;
      this.seen_mail.emit(this.mail.seen);
      const the_modal = this.modalService.open(EmailModalComponent, { animation: false, size: 'xl' });
      the_modal.componentInstance.mail_id = this.mail?.id;
      the_modal.componentInstance.folder = "inbox";
    }
  }

  swapSeen(): void {
    if (this.mail) {
      this.mail.seen = !this.mail.seen;
      this.seen_mail.emit(this.mail.seen);
    }
  }

}