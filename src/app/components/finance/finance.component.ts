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
  totalSaved: number;
  averageMonthlyQuota?: number;
  goals: FinanceGoal[];
  monthlySavings: SavingsPoint[];
  notes: string[];
}

interface GoalViewModel extends FinanceGoal {
  remaining: number;
  progressPercent: number;
}

interface DashboardSettings {
  totalSaved: number;
  pomGoal: number;
  carFundGoal: number;
}

interface FinanceDraft {
  title: string;
  settings: DashboardSettings;
  monthlySavings: SavingsPoint[];
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
    totalSaved: 0,
    averageMonthlyQuota: 0,
    goals: [],
    monthlySavings: [],
    notes: []
  };
  draft: FinanceDraft = this.createDraft(this.dashboard);
  isLoading = true;
  hasError = false;
  isEditing = false;
  isSaving = false;
  saveFailed = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/finance/login']);
    });
  }

  loadDashboard(): void {
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

      this.dashboard = this.normalizeDashboard(dashboard);
      this.draft = this.createDraft(this.dashboard);
      this.isLoading = false;
      this.hasError = false;
    });
  }

  startEditing(): void {
    this.draft = this.createDraft(this.dashboard);
    this.isEditing = true;
    this.saveFailed = false;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.saveFailed = false;
    this.draft = this.createDraft(this.dashboard);
  }

  addMonthlyContribution(): void {
    this.draft.monthlySavings.push({
      date: this.getNextContributionMonth(),
      amount: 0
    });
    this.sortDraftMonthlySavings();
  }

  removeMonthlyContribution(index: number): void {
    this.draft.monthlySavings.splice(index, 1);
  }

  saveDashboard(): void {
    if (this.isSaving) {
      return;
    }

    const payload = this.buildPayloadFromDraft();
    this.isSaving = true;
    this.saveFailed = false;

    this.http.put<FinanceDashboard>(
      `${environment.backendUrl}/api/finance`,
      payload,
      { withCredentials: true }
    ).pipe(
      catchError(() => {
        this.isSaving = false;
        this.saveFailed = true;
        return of(null);
      })
    ).subscribe((dashboard) => {
      if (!dashboard) {
        return;
      }

      this.dashboard = this.normalizeDashboard(dashboard);
      this.draft = this.createDraft(this.dashboard);
      this.isSaving = false;
      this.isEditing = false;
    });
  }

  get goalCards(): GoalViewModel[] {
    return this.dashboard.goals.map((goal) => {
      const remaining = Math.max(goal.target - goal.current, 0);
      const progressPercent = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;
      return { ...goal, remaining, progressPercent };
    });
  }

  get monthlyAverage(): number {
    return this.dashboard.averageMonthlyQuota || 0;
  }

  get draftMonthlyAverage(): number {
    if (this.draft.monthlySavings.length === 0) {
      return 0;
    }

    return this.draft.monthlySavings.reduce((total, item) => total + this.normalizeNumber(item.amount), 0) / this.draft.monthlySavings.length;
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

  formatMonthInput(date: string): string {
    return date.slice(0, 7);
  }

  onMonthChanged(index: number, monthValue: string): void {
    this.draft.monthlySavings[index].date = monthValue ? `${monthValue}-01` : '';
    this.sortDraftMonthlySavings();
  }

  private buildPayloadFromDraft(): FinanceDashboard {
    const monthlySavings = this.draft.monthlySavings
      .map((item) => ({
        date: item.date,
        amount: this.normalizeNumber(item.amount)
      }))
      .filter((item) => item.date)
      .sort((left, right) => left.date.localeCompare(right.date));

    const averageMonthlyQuota = monthlySavings.length === 0
      ? 0
      : monthlySavings.reduce((total, item) => total + item.amount, 0) / monthlySavings.length;

    return {
      title: this.draft.title || 'Savings Dashboard',
      updatedAt: new Date().toISOString().slice(0, 10),
      totalSaved: this.normalizeNumber(this.draft.settings.totalSaved),
      averageMonthlyQuota,
      goals: this.buildGoalsFromSettings(
        this.normalizeNumber(this.draft.settings.totalSaved),
        this.normalizeNumber(this.draft.settings.pomGoal),
        this.normalizeNumber(this.draft.settings.carFundGoal),
        averageMonthlyQuota
      ),
      monthlySavings,
      notes: []
    };
  }

  private normalizeDashboard(dashboard: FinanceDashboard): FinanceDashboard {
    const settings = this.extractSettings(dashboard);

    return {
      title: dashboard.title || 'Savings Dashboard',
      updatedAt: dashboard.updatedAt,
      totalSaved: this.normalizeNumber(dashboard.totalSaved),
      averageMonthlyQuota: this.normalizeNumber(dashboard.averageMonthlyQuota),
      goals: this.buildGoalsFromSettings(
        settings.totalSaved,
        settings.pomGoal,
        settings.carFundGoal,
        this.normalizeNumber(dashboard.averageMonthlyQuota)
      ),
      monthlySavings: (dashboard.monthlySavings || []).slice().sort((left, right) => left.date.localeCompare(right.date)),
      notes: dashboard.notes || []
    };
  }

  private createDraft(dashboard: FinanceDashboard): FinanceDraft {
    const settings = this.extractSettings(dashboard);

    return {
      title: dashboard.title || 'Savings Dashboard',
      settings,
      monthlySavings: dashboard.monthlySavings.map((item) => ({ ...item }))
    };
  }

  private extractSettings(dashboard: FinanceDashboard): DashboardSettings {
    const pomGoal = dashboard.goals.find((goal) => goal.name === 'POM')?.target ?? 0;
    const carFundGoal = dashboard.goals.find((goal) => goal.name === 'Car Fund')?.target ?? 0;

    return {
      totalSaved: this.normalizeNumber(dashboard.totalSaved),
      pomGoal: this.normalizeNumber(pomGoal),
      carFundGoal: this.normalizeNumber(carFundGoal)
    };
  }

  private buildGoalsFromSettings(totalSaved: number, pomGoal: number, carFundGoal: number, averageMonthlyQuota: number): FinanceGoal[] {
    const pomCurrent = Math.min(totalSaved, pomGoal);
    const carFundCurrent = Math.max(totalSaved - pomGoal, 0);

    return [
      {
        name: 'POM',
        current: pomCurrent,
        target: pomGoal,
        etaMonths: this.calculateEtaMonths(pomGoal - pomCurrent, averageMonthlyQuota),
        etaLabel: this.formatEtaLabel(this.calculateEtaMonths(pomGoal - pomCurrent, averageMonthlyQuota))
      },
      {
        name: 'Car Fund',
        current: carFundCurrent,
        target: carFundGoal,
        etaMonths: this.calculateEtaMonths(carFundGoal - carFundCurrent, averageMonthlyQuota),
        etaLabel: this.formatEtaLabel(this.calculateEtaMonths(carFundGoal - carFundCurrent, averageMonthlyQuota))
      }
    ];
  }

  private calculateEtaMonths(remaining: number, averageMonthlyQuota: number): number | undefined {
    if (remaining <= 0) {
      return 0;
    }

    if (averageMonthlyQuota <= 0) {
      return undefined;
    }

    return Math.ceil(remaining / averageMonthlyQuota);
  }

  private formatEtaLabel(months: number | undefined): string | undefined {
    if (months == null) {
      return 'No estimate available';
    }

    if (months === 0) {
      return 'Goal reached';
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `Estimated in ${months} month${months === 1 ? '' : 's'}`;
    }

    if (remainingMonths === 0) {
      return `Estimated in ${years} year${years === 1 ? '' : 's'}`;
    }

    return `Estimated in ${years} year${years === 1 ? '' : 's'} and ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
  }

  private getNextContributionMonth(): string {
    if (this.draft.monthlySavings.length === 0) {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    }

    const latest = this.draft.monthlySavings
      .map((item) => item.date)
      .filter(Boolean)
      .sort()
      .pop();

    if (!latest) {
      return new Date().toISOString().slice(0, 7) + '-01';
    }

    const nextMonth = new Date(`${latest}T00:00:00`);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}-01`;
  }

  private sortDraftMonthlySavings(): void {
    this.draft.monthlySavings.sort((left, right) => left.date.localeCompare(right.date));
  }

  private normalizeNumber(value: number | string | null | undefined): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
