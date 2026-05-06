import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

interface FinanceMetric {
  label: string;
  value: string;
}

interface FinanceAccount {
  name: string;
  amount: string;
  note?: string;
}

interface FinanceDashboard {
  updatedAt: string | null;
  totals: FinanceMetric[];
  accounts: FinanceAccount[];
  notes: string[];
}

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  dashboard: FinanceDashboard = {
    updatedAt: null,
    totals: [],
    accounts: [],
    notes: []
  };
  isLoading = true;
  hasError = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get<FinanceDashboard>(
      `${environment.backendUrl}/api/finance`,
      { withCredentials: true }
    ).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.redirectToLogin();
        } else {
          this.hasError = true;
        }

        this.isLoading = false;
        return of(null);
      })
    ).subscribe((dashboard) => {
      if (!dashboard) {
        return;
      }

      this.dashboard = dashboard;
      this.isLoading = false;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/finance/login']);
    });
  }
}
