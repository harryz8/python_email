import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { MailAPI } from '../entities/mail/mail-api.service';
import { IMail } from '../entities/mail/mail.model';
import { IUser } from '../entities/user/user.model';
import { EmailComponent } from "../email/email.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-inbox-test',
  standalone: true,
  imports: [EmailComponent, FontAwesomeModule, NgClass, DatePipe],
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
  today = Date();
  firstDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  lastDate = new Date(this.today);
  datePipe = new DatePipe('en-GB');

  ngOnInit(): void {
      this.isLoading = true;
      this.mailService.getFolderToplineAfter("inbox", this.datePipe.transform(new Date(this.firstDate.getTime() + 24*60*60*1000), 'dd-MMM-yyyy')!, this.datePipe.transform(new Date(this.lastDate.getTime() + 24*60*60*1000), 'dd-MMM-yyyy')!).subscribe(mail => this.finished(mail.body!));
      this.userService.currentUser.subscribe(cur_user => this.the_user = cur_user);
  }

  finished(mail : IMail[]) : void {
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

  sameDay(date1 : Date, dateStr2: string) : boolean {
    const date2 = new Date(dateStr2);
    if (date1.getDate() !== date2.getDate()) {
      return false;
    }
    if (date1.getMonth() !== date2.getMonth()) {
      return false;
    }
    if (date1.getFullYear() !== date2.getFullYear()) {
      return false;
    }
    return true;
  }

  decWeek() : void {
    this.isLoading = true;
    this.inbox = [];
    this.firstDate = new Date(this.firstDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    this.lastDate = new Date(this.lastDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    this.mailService.getFolderToplineAfter("inbox", this.datePipe.transform(new Date(this.firstDate.getTime() + 24*60*60*1000), 'dd-MMM-yyyy')!, this.datePipe.transform(new Date(this.lastDate.getTime() + 24*60*60*1000), 'dd-MMM-yyyy')!).subscribe(mail => this.finished(mail.body!));
  }

  incWeek() : void {
    this.isLoading = true;
    this.inbox = [];
    this.firstDate = new Date(this.firstDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    this.lastDate = new Date(this.lastDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    this.mailService.getFolderToplineAfter("inbox", this.datePipe.transform(new Date(this.firstDate.getTime() + 24*60*60*1000), 'dd-MMM-yyyy')!, this.datePipe.transform(new Date(this.lastDate.getTime() + 24*60*60*1000), 'dd-MMM-yyyy')!).subscribe(mail => this.finished(mail.body!));
  }

  setSeen(mail : IMail, val : boolean) {
    let element = this.inbox?.find(el => el.id = mail.id);
    if (element) {
      element.seen = val;
    }
    return
  }

}
