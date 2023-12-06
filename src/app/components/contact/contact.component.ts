import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {backend} from "../../../config/config";
import {catchError, of} from "rxjs";

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
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  isLoading = false;

  getErrorMessage() {
    if (this.email.hasError('required')) return 'You must enter a value';
    else if (this.email.hasError('pattern')) return 'Not a valid email';
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  isFormInvalid() {
    return this.email.invalid || this.name.invalid || this.subject.invalid || this.message.invalid;
  }

  sendForm() {
    this.isLoading = true; // Show the loading spinner
  
    this.http.post<any>(backend + '/submit-contact-form', {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value
    }).pipe(
      catchError(() => of([]))
    ).subscribe(contactResponse => {
      this.isLoading = false; // Hide the loading spinner
  
      if (contactResponse && contactResponse.message === "Mail send") {
        const dialogRef = this.dialog.open(SubmitSuccess);
  
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home']); // Navigate to the home route after dialog is closed
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
