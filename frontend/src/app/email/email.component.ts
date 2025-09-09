import { Component, inject, Input } from '@angular/core';
import { IMail } from '../entities/mail/mail.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailModalComponent } from '../email-modal/email-modal.component'

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent {

  private modalService = inject(NgbModal);

  @Input() mail : IMail | null = null;
  faUpRightAndDownLeftFromCenter = faUpRightAndDownLeftFromCenter;
  faDownLeftAndUpRightToCenter = faDownLeftAndUpRightToCenter;

  openModal() {
    const the_modal = this.modalService.open(EmailModalComponent, { animation: false, size: 'xl' });
    the_modal.componentInstance.mail_id = this.mail?.id;
    the_modal.componentInstance.folder = "inbox";
  }

}