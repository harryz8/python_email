import { Component, inject, Input, OnInit } from '@angular/core';
import { IMail } from '../entities/mail/mail.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailModalComponent } from '../email-modal/email-modal.component'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FontAwesomeModule, DatePipe],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent implements OnInit {

  private modalService = inject(NgbModal);

  @Input() mail : IMail | null = null;
  faUpRightAndDownLeftFromCenter = faUpRightAndDownLeftFromCenter;
  faDownLeftAndUpRightToCenter = faDownLeftAndUpRightToCenter;
  date : Date | null = null;

  ngOnInit(): void {
      if (this.mail !== null) {
        this.date = new Date(this.mail.date);
      }
  }

  openModal(): void {
    const the_modal = this.modalService.open(EmailModalComponent, { animation: false, size: 'xl' });
    the_modal.componentInstance.mail_id = this.mail?.id;
    the_modal.componentInstance.folder = "inbox";
  }

}