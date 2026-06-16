import { Component } from '@angular/core';

type ActivityTheme = 'adria' | 'olivia';
type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
type CalendarEventKind = 'activity' | 'commute';

interface CalendarSlot {
  day: WeekDay;
  start: string;
  end: string;
}

interface CalendarEvent {
  activity: ExtraActivity;
  slot: CalendarSlot;
  kind: CalendarEventKind;
}

interface PriceLine {
  label: string;
  amount?: number;
  total?: boolean;
}

interface ExtraActivity {
  id: string;
  title: string;
  emoji: string;
  theme: ActivityTheme;
  testSlots?: string[];
  scheduleTitle?: string;
  schedules: string[];
  calendarSlots: CalendarSlot[];
  price: PriceLine[];
  details: string[];
  organization?: string;
  contact: string[];
  location?: string[];
}

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.css']
})
export class ExtrasComponent {
  baseAnnualQuota = 3282;
  weekDays = [
    { key: 'monday' as WeekDay, short: 'L', name: 'Lunes' },
    { key: 'tuesday' as WeekDay, short: 'M', name: 'Martes' },
    { key: 'wednesday' as WeekDay, short: 'X', name: 'Miércoles' },
    { key: 'thursday' as WeekDay, short: 'J', name: 'Jueves' },
    { key: 'friday' as WeekDay, short: 'V', name: 'Viernes' }
  ];
  timeSlots = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  selectedActivityIds: Partial<Record<ActivityTheme, string>> = {};
  footballFixedPrices: PriceLine[] = [
    { label: 'Mutua de fútbol', amount: 55.18 },
    { label: 'Federación de fútbol', amount: 24.5 },
    { label: 'Revisión médica de fútbol', amount: 30 }
  ];
  penyaBlaugranaPrice: PriceLine[] = this.withFootballTotal(585, 240);
  torretaPrice: PriceLine[] = this.withFootballTotal(470, 80);

  activities: ExtraActivity[] = [
    {
      id: 'adria-penya-blaugrana',
      title: 'Futbol Penya Blaugrana',
      emoji: '⚽️',
      theme: 'adria',
      testSlots: [
        'Martes 9: 17:30-18:45',
        'Miércoles 10: 17:30-18:45'
      ],
      scheduleTitle: 'Horarios curso 26-27',
      schedules: [
        'Martes y Jueves: 18:45 a 20:15',
        'Viernes: 18:30 a 19:30'
      ],
      calendarSlots: [
        { day: 'tuesday', start: '18:45', end: '20:15' },
        { day: 'thursday', start: '18:45', end: '20:15' },
        { day: 'friday', start: '18:30', end: '19:30' }
      ],
      price: this.penyaBlaugranaPrice,
      details: [
        'Categoria: 2a',
        'Hay equipación',
        'Precio equipación: 240'
      ],
      contact: ['Contacto Edgar: 690 04 13 40']
    },
    {
      id: 'adria-torreta',
      title: 'Futbol Torreta',
      emoji: '⚽️',
      theme: 'adria',
      testSlots: [
        'Lunes: 18:30',
        'Jueves: 17:45'
      ],
      scheduleTitle: 'Horarios curso 26-27',
      schedules: ['Lunes, Martes y Jueves: 17:15 - 18:30'],
      calendarSlots: [
        { day: 'monday', start: '17:15', end: '18:30' },
        { day: 'tuesday', start: '17:15', end: '18:30' },
        { day: 'thursday', start: '17:15', end: '18:30' }
      ],
      price: this.torretaPrice,
      details: [
        'Categoria: 2a',
        'Precio equipación: 80'
      ],
      contact: ['Contacto Dani: 607620828']
    },
    {
      id: 'olivia-patinaje',
      title: 'Patinaje',
      emoji: '🛼',
      theme: 'olivia',
      testSlots: [
        'Lunes 8: 17:30-18:30',
        'Lunes 15: 17:30-18:30',
        'Miércoles 17: 17:30-18:30'
      ],
      scheduleTitle: 'Horarios curso 26-27',
      schedules: ['Lunes y Miércoles: 17:30-18:30'],
      calendarSlots: [
        { day: 'monday', start: '17:30', end: '18:30' },
        { day: 'wednesday', start: '17:30', end: '18:30' }
      ],
      price: [
        ...this.withTotal([
          { label: 'Cuota', amount: 550 },
          { label: 'Matrícula', amount: 50 }
        ])
      ],
      details: [
        'Si se apunta en junio-julio no se paga matrícula (50€)',
        'No hay equipación',
        'Findes libres',
        'Competición 3-4 findes al año (no obligatoria)',
        'categoría: amarillo'
      ],
      organization: 'Associació de Patinatge Artístic Granollers',
      contact: [
        'Contacto África: 615 159 871',
        'Entrenadora: Marina'
      ],
      location: ['Lloc: Lluís Companys, 1']
    },
    {
      id: 'olivia-gimnasia-artistica',
      title: 'Gimnasia Artística',
      emoji: '🤸🏼',
      theme: 'olivia',
      scheduleTitle: 'Horarios curso que viene',
      schedules: ['Lunes y Miércoles: 17:30-18:30'],
      calendarSlots: [
        { day: 'monday', start: '17:30', end: '18:30' },
        { day: 'wednesday', start: '17:30', end: '18:30' }
      ],
      price: [
        ...this.withTotal([
          { label: 'Cuota', amount: 999.35 },
          { label: 'Matrícula', amount: 50 },
          { label: 'Matrícula federación', amount: 50 },
          { label: 'Equipación', amount: 60 }
        ])
      ],
      details: [
        'matrícula 50 de federacio i 50 d\'equipacio',
        'equipación: 60',
        'Findes libres - No',
        'Competición - No'
      ],
      contact: [
        'Club Natacio Granollers Secció Gimnastica Artistica',
        'Carrer de Lluís Companys, 8',
        'Elisabet Valle',
        'Teléfono: 938704599'
      ]
    },
    {
      id: 'olivia-gimnastica-dynasty-union',
      title: 'Gimnastica Dynasty Union',
      emoji: '🤸🏼',
      theme: 'olivia',
      scheduleTitle: 'Horarios curso que viene',
      schedules: ['Por confirmar'],
      calendarSlots: [],
      price: [
        { label: 'Total', amount: 0, total: true }
      ],
      details: [
        'Por confirmar'
      ],
      contact: [
        'Dinasty Union ESCOLA DE CAMPIONS',
        'Carrer Gran Bretanya, 13, 08520 Barcelona',
        'Telefono: 656 94 18 77',
        'Abre: 17:30'
      ]
    }
  ];

  isSelected(activity: ExtraActivity): boolean {
    return this.selectedActivityIds[activity.theme] === activity.id;
  }

  getSelectedActivitiesTotal(): number {
    return this.activities
      .filter((activity) => this.isSelected(activity))
      .reduce((sum, activity) => sum + this.getActivityTotal(activity), 0);
  }

  getNewAnnualQuota(): number {
    return this.baseAnnualQuota + this.getSelectedActivitiesTotal();
  }

  getNewMonthlyQuota(): number {
    return this.getNewAnnualQuota() / 12;
  }

  getHalfMonthlyQuota(): number {
    return this.getNewMonthlyQuota() / 2;
  }

  getMonthlyQuotaShare(percentage: number): number {
    return this.getNewMonthlyQuota() * percentage / 100;
  }

  toggleSelection(activity: ExtraActivity, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedActivityIds[activity.theme] = checked ? activity.id : undefined;
  }

  getCalendarEvents(day: WeekDay, time: string): CalendarEvent[] {
    return this.activities
      .filter((activity) => this.isSelected(activity))
      .flatMap((activity) => activity.calendarSlots
        .flatMap((slot) => this.withCommuteEvents(activity, slot))
        .filter((calendarEvent) => this.isSlotStart(calendarEvent.slot, day, time)));
  }

  getCalendarEventStyle(slot: CalendarSlot, time: string): Record<string, string> {
    const hourStart = this.toMinutes(time);
    const top = (this.toMinutes(slot.start) - hourStart) / 60 * 100;
    const height = (this.toMinutes(slot.end) - this.toMinutes(slot.start)) / 60 * 100;

    return {
      top: `${top}%`,
      height: `${height}%`
    };
  }

  private isSlotStart(slot: CalendarSlot, day: WeekDay, time: string): boolean {
    return slot.day === day && this.toMinutes(time) <= this.toMinutes(slot.start) && this.toMinutes(slot.start) < this.toMinutes(time) + 60;
  }

  private withCommuteEvents(activity: ExtraActivity, slot: CalendarSlot): CalendarEvent[] {
    const start = this.toMinutes(slot.start);
    const end = this.toMinutes(slot.end);

    return [
      { activity, slot: this.withTimeRange(slot, start - 15, start), kind: 'commute' },
      { activity, slot, kind: 'activity' },
      { activity, slot: this.withTimeRange(slot, end, end + 15), kind: 'commute' }
    ];
  }

  private withTimeRange(slot: CalendarSlot, start: number, end: number): CalendarSlot {
    return {
      day: slot.day,
      start: this.toTime(start),
      end: this.toTime(end)
    };
  }

  private toMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private toTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    return `${hours}:${remainder.toString().padStart(2, '0')}`;
  }

  formatAmount(amount: number): string {
    return `${amount.toLocaleString('es-ES', { minimumFractionDigits: amount % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}€`;
  }

  private getActivityTotal(activity: ExtraActivity): number {
    return activity.price.find((line) => line.total)?.amount || 0;
  }

  private withTotal(lines: PriceLine[]): PriceLine[] {
    const total = lines.reduce((sum, line) => sum + (line.amount || 0), 0);
    return [...lines, { label: 'Total', amount: total, total: true }];
  }

  private withFootballTotal(cuota: number, equipacion: number): PriceLine[] {
    return this.withTotal([
      ...this.footballFixedPrices,
      { label: 'Cuota de fútbol', amount: cuota },
      { label: 'Equipación de fútbol', amount: equipacion }
    ]);
  }
}
