import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

Chart.register(...registerables);

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

  isLoading = true;
  hasError = false;
  isSaving = false;
  saveError = false;

  editingField: 'totalSaved' | 'pomGoal' | 'carFundGoal' | null = null;
  fieldDraft = '';

  editingRowDate: string | null = null;
  rowDraft = { date: '', amount: '' };

  isAddingRow = false;
  newRowDraft = { date: '', amount: '' };

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Monthly savings',
      fill: true,
      tension: 0.4,
      borderColor: '#1d7ea0',
      backgroundColor: 'rgba(29, 126, 160, 0.08)',
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#1d7ea0',
      pointBorderWidth: 2.5,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => this.formatCurrency(ctx.parsed.y ?? 0)
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `€${Number(value).toLocaleString()}`
        },
        grid: { color: 'rgba(0,0,0,0.04)' }
      },
      x: {
        grid: { display: false },
        ticks: { maxRotation: 45 }
      }
    }
  };

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
      if (!dashboard) return;
      this.dashboard = this.normalizeDashboard(dashboard);
      this.refreshChartData();
      this.isLoading = false;
    });
  }

  // ─── Settings inline editing ──────────────────────────────────────────────

  startEditingField(field: 'totalSaved' | 'pomGoal' | 'carFundGoal'): void {
    this.editingField = field;
    if (field === 'totalSaved') this.fieldDraft = String(this.dashboard.totalSaved);
    else if (field === 'pomGoal') this.fieldDraft = String(this.getPomGoal());
    else this.fieldDraft = String(this.getCarFundGoal());
  }

  cancelEditingField(): void {
    this.editingField = null;
    this.fieldDraft = '';
  }

  saveField(): void {
    if (!this.editingField || this.isSaving) return;
    const value = this.normalizeNumber(this.fieldDraft);
    this.persist(this.buildPayload({
      totalSaved: this.editingField === 'totalSaved' ? value : this.dashboard.totalSaved,
      pomGoal: this.editingField === 'pomGoal' ? value : this.getPomGoal(),
      carFundGoal: this.editingField === 'carFundGoal' ? value : this.getCarFundGoal()
    }), () => {
      this.editingField = null;
      this.fieldDraft = '';
    });
  }

  // ─── Contribution row inline editing ─────────────────────────────────────

  startEditingRow(date: string): void {
    const row = this.dashboard.monthlySavings.find((r) => r.date === date)!;
    this.editingRowDate = date;
    this.rowDraft = { date: date.slice(0, 7), amount: String(row.amount) };
  }

  cancelEditingRow(): void {
    this.editingRowDate = null;
    this.rowDraft = { date: '', amount: '' };
  }

  saveRow(): void {
    if (this.isSaving) return;
    const updated = this.dashboard.monthlySavings.map((item) =>
      item.date !== this.editingRowDate ? item : {
        date: this.rowDraft.date ? `${this.rowDraft.date}-01` : item.date,
        amount: this.normalizeNumber(this.rowDraft.amount)
      }
    );
    this.persist(this.buildPayload({ monthlySavings: updated }), () => {
      this.editingRowDate = null;
      this.rowDraft = { date: '', amount: '' };
    });
  }

  deleteRow(date: string): void {
    if (this.isSaving) return;
    this.persist(this.buildPayload({
      monthlySavings: this.dashboard.monthlySavings.filter((item) => item.date !== date)
    }), () => {});
  }

  // ─── Adding a new row ─────────────────────────────────────────────────────

  startAddingRow(): void {
    this.isAddingRow = true;
    this.newRowDraft = { date: this.getNextMonth(), amount: '' };
  }

  cancelAddingRow(): void {
    this.isAddingRow = false;
    this.newRowDraft = { date: '', amount: '' };
  }

  saveNewRow(): void {
    if (this.isSaving || !this.newRowDraft.date) return;
    const updated = [...this.dashboard.monthlySavings, {
      date: `${this.newRowDraft.date}-01`,
      amount: this.normalizeNumber(this.newRowDraft.amount)
    }];
    this.persist(this.buildPayload({ monthlySavings: updated }), () => {
      this.isAddingRow = false;
      this.newRowDraft = { date: '', amount: '' };
    });
  }

  // ─── Getters ─────────────────────────────────────────────────────────────

  get goalCards(): GoalViewModel[] {
    return this.dashboard.goals.map((goal) => ({
      ...goal,
      remaining: Math.max(goal.target - goal.current, 0),
      progressPercent: goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0
    }));
  }

  get monthlyAverage(): number {
    return this.dashboard.averageMonthlyQuota || 0;
  }

  get bestMonth(): SavingsPoint | null {
    if (!this.dashboard.monthlySavings.length) return null;
    return this.dashboard.monthlySavings.reduce((best, item) => item.amount > best.amount ? item : best);
  }

  get latestMonth(): SavingsPoint | null {
    if (!this.dashboard.monthlySavings.length) return null;
    return this.dashboard.monthlySavings[this.dashboard.monthlySavings.length - 1];
  }

  get displayedContributions(): SavingsPoint[] {
    return [...this.dashboard.monthlySavings].reverse();
  }

  getPomGoal(): number {
    return this.dashboard.goals.find((g) => g.name === 'POM')?.target ?? 0;
  }

  getCarFundGoal(): number {
    return this.dashboard.goals.find((g) => g.name === 'Car Fund')?.target ?? 0;
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

  // ─── Private helpers ──────────────────────────────────────────────────────

  private persist(payload: FinanceDashboard, onSuccess: () => void): void {
    this.isSaving = true;
    this.saveError = false;
    this.http.put<FinanceDashboard>(
      `${environment.backendUrl}/api/finance`,
      payload,
      { withCredentials: true }
    ).pipe(
      catchError(() => {
        this.isSaving = false;
        this.saveError = true;
        return of(null);
      })
    ).subscribe((dashboard) => {
      if (!dashboard) return;
      this.dashboard = this.normalizeDashboard(dashboard);
      this.refreshChartData();
      this.isSaving = false;
      onSuccess();
    });
  }

  private buildPayload(overrides: {
    totalSaved?: number;
    pomGoal?: number;
    carFundGoal?: number;
    monthlySavings?: SavingsPoint[];
  } = {}): FinanceDashboard {
    const totalSaved = overrides.totalSaved ?? this.dashboard.totalSaved;
    const pomGoal = overrides.pomGoal ?? this.getPomGoal();
    const carFundGoal = overrides.carFundGoal ?? this.getCarFundGoal();
    const monthlySavings = (overrides.monthlySavings ?? this.dashboard.monthlySavings)
      .filter((item) => item.date)
      .slice()
      .sort((a, b) => a.date.localeCompare(b.date));
    const averageMonthlyQuota = monthlySavings.length
      ? monthlySavings.reduce((sum, item) => sum + item.amount, 0) / monthlySavings.length
      : 0;
    const pomCurrent = Math.min(totalSaved, pomGoal);
    const carFundCurrent = Math.max(totalSaved - pomGoal, 0);

    return {
      title: this.dashboard.title || 'Savings Dashboard',
      updatedAt: new Date().toISOString().slice(0, 10),
      totalSaved,
      averageMonthlyQuota,
      goals: [
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
      ],
      monthlySavings,
      notes: this.dashboard.notes || []
    };
  }

  private normalizeDashboard(dashboard: FinanceDashboard): FinanceDashboard {
    return {
      title: dashboard.title || 'Savings Dashboard',
      updatedAt: dashboard.updatedAt,
      totalSaved: this.normalizeNumber(dashboard.totalSaved),
      averageMonthlyQuota: this.normalizeNumber(dashboard.averageMonthlyQuota),
      goals: (dashboard.goals || []).map((goal) => ({
        name: goal.name,
        current: this.normalizeNumber(goal.current),
        target: this.normalizeNumber(goal.target),
        etaMonths: goal.etaMonths != null ? this.normalizeNumber(goal.etaMonths) : undefined,
        etaLabel: goal.etaLabel
      })),
      monthlySavings: (dashboard.monthlySavings || [])
        .filter((item) => item.date)
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date)),
      notes: dashboard.notes || []
    };
  }

  private refreshChartData(): void {
    const savings = this.dashboard.monthlySavings;
    this.lineChartData = {
      labels: savings.map((item) => this.formatMonth(item.date)),
      datasets: [{
        data: savings.map((item) => item.amount),
        label: 'Monthly savings',
        fill: true,
        tension: 0.4,
        borderColor: '#1d7ea0',
        backgroundColor: 'rgba(29, 126, 160, 0.08)',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#1d7ea0',
        pointBorderWidth: 2.5,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    };
  }

  private getNextMonth(): string {
    if (!this.dashboard.monthlySavings.length) {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    }
    const latest = [...this.dashboard.monthlySavings].sort((a, b) => b.date.localeCompare(a.date))[0];
    const next = new Date(`${latest.date}T00:00:00`);
    next.setMonth(next.getMonth() + 1);
    return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`;
  }

  private calculateEtaMonths(remaining: number, averageMonthlyQuota: number): number | undefined {
    if (remaining <= 0) return 0;
    if (averageMonthlyQuota <= 0) return undefined;
    return Math.ceil(remaining / averageMonthlyQuota);
  }

  private formatEtaLabel(months: number | undefined): string | undefined {
    if (months == null) return 'No estimate available';
    if (months === 0) return 'Goal reached';
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `Estimated in ${months} month${months === 1 ? '' : 's'}`;
    if (remainingMonths === 0) return `Estimated in ${years} year${years === 1 ? '' : 's'}`;
    return `Estimated in ${years} year${years === 1 ? '' : 's'} and ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
  }

  private normalizeNumber(value: number | string | null | undefined): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
