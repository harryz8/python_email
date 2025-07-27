import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IMail } from '../entities/mail/mail.model';

@Component({
  selector: 'app-email-modal',
  standalone: true,
  imports: [],
  templateUrl: './email-modal.component.html',
  styleUrl: './email-modal.component.scss'
})
export class EmailModalComponent {

  @Input() mail : IMail | null = null;

  constructor(public activeModal : NgbActiveModal) {
  }

}
