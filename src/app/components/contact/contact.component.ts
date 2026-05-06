import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, EMPTY } from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {

  }

  name = new FormControl('', [Validators.required]);
  subject = new FormControl('', [Validators.required]);
  message = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  website = new FormControl('');
  isLoading = false;

  getErrorMessage() {
    if (this.email.hasError('required')) return 'You must enter a value';
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  isFormInvalid() {
    return this.email.invalid || this.name.invalid || this.subject.invalid || this.message.invalid;
  }

  sendForm() {
    if (this.isLoading || this.isFormInvalid()) {
      return;
    }

    this.isLoading = true;

    this.http.post<any>(environment.backendUrl + '/submit-contact-form', {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value,
      website: this.website.value
    }).pipe(
      catchError(() => {
        this.isLoading = false;
        this.dialog.open(SubmitFailure);
        return EMPTY;
      })
    ).subscribe(contactResponse => {
      this.isLoading = false;

      if (contactResponse && contactResponse.message === "Mail send") {
        const dialogRef = this.dialog.open(SubmitSuccess);
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        });
      } else {
        this.dialog.open(SubmitFailure);
      }
    });
  }
}

@Component({
  selector: 'submit-success',
  templateUrl: 'submit-success.html',
})
export class SubmitSuccess {

}

@Component({
  selector: 'submit-failure',
  templateUrl: 'submit-failure.html',
})
export class SubmitFailure {

}
