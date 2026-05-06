import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-finance-login',
  templateUrl: './finance-login.component.html',
  styleUrls: ['./finance-login.component.css']
})
export class FinanceLoginComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  isLoading = false;
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) {}

  isFormInvalid(): boolean {
    return this.username.invalid || this.password.invalid;
  }

  submit(): void {
    if (this.isLoading || this.isFormInvalid()) {
      return;
    }

    this.isLoading = true;
    this.loginFailed = false;

    this.authService.login(this.username.value || '', this.password.value || '').subscribe((authenticated) => {
      this.isLoading = false;

      if (authenticated) {
        this.router.navigate(['/finance']);
      } else {
        this.loginFailed = true;
      }
    });
  }
}
