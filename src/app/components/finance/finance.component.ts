import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

interface FinanceGoal {
  name: string;
  current: number;
  target: number;
  etaMonths?: number;
  etaLabel?: string;
}

interface SavingsPoint {
  date: string;
  amount: number;
}

interface FinanceDashboard {
  title?: string;
  updatedAt: string | null;
  averageMonthlyQuota?: number;
  goals: FinanceGoal[];
  monthlySavings: SavingsPoint[];
  notes: string[];
}

interface GoalViewModel extends FinanceGoal {
  remaining: number;
  progressPercent: number;
}

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  dashboard: FinanceDashboard = {
    title: 'Savings Dashboard',
    updatedAt: null,
    averageMonthlyQuota: 0,
    goals: [],
    monthlySavings: [],
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

      this.dashboard = {
        title: dashboard.title || 'Savings Dashboard',
        updatedAt: dashboard.updatedAt,
        averageMonthlyQuota: dashboard.averageMonthlyQuota || 0,
        goals: dashboard.goals || [],
        monthlySavings: dashboard.monthlySavings || [],
        notes: dashboard.notes || []
      };
      this.isLoading = false;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/finance/login']);
    });
  }

  get goalCards(): GoalViewModel[] {
    return this.dashboard.goals.map((goal) => {
      const remaining = Math.max(goal.target - goal.current, 0);
      const progressPercent = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;
      return { ...goal, remaining, progressPercent };
    });
  }

  get totalSaved(): number {
    return this.dashboard.goals.reduce((total, goal) => total + goal.current, 0);
  }

  get monthlyAverage(): number {
    if (this.dashboard.averageMonthlyQuota && this.dashboard.averageMonthlyQuota > 0) {
      return this.dashboard.averageMonthlyQuota;
    }

    if (this.dashboard.monthlySavings.length === 0) {
      return 0;
    }

    return this.dashboard.monthlySavings.reduce((total, item) => total + item.amount, 0) / this.dashboard.monthlySavings.length;
  }

  get bestMonth(): SavingsPoint | null {
    if (this.dashboard.monthlySavings.length === 0) {
      return null;
    }

    return this.dashboard.monthlySavings.reduce((best, item) => item.amount > best.amount ? item : best);
  }

  get latestMonth(): SavingsPoint | null {
    if (this.dashboard.monthlySavings.length === 0) {
      return null;
    }

    return this.dashboard.monthlySavings[this.dashboard.monthlySavings.length - 1];
  }

  get chartPoints(): string {
    if (this.dashboard.monthlySavings.length === 0) {
      return '';
    }

    const width = 640;
    const height = 220;
    const padding = 24;
    const maxAmount = Math.max(...this.dashboard.monthlySavings.map((item) => item.amount), 1);
    const step = this.dashboard.monthlySavings.length === 1 ? 0 : (width - (padding * 2)) / (this.dashboard.monthlySavings.length - 1);

    return this.dashboard.monthlySavings.map((item, index) => {
      const x = padding + (index * step);
      const y = height - padding - ((item.amount / maxAmount) * (height - (padding * 2)));
      return `${x},${y}`;
    }).join(' ');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2
    }).format(value);
  }

  formatMonth(date: string): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric'
    }).format(new Date(date));
  }
}
