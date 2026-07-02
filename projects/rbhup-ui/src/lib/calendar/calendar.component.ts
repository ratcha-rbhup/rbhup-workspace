import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-calendar card shadow-sm border">
      <!-- Navigation Header -->
      <div class="rb-cal-header d-flex align-center justify-between px-4 py-3 border-b">
        <button (click)="prevMonth()" class="rb-cal-nav border-none bg-transparent cursor-pointer text-muted rounded-sm p-1 transition-fast">◀</button>
        <span class="text-sm font-bold text-main">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
        <button (click)="nextMonth()" class="rb-cal-nav border-none bg-transparent cursor-pointer text-muted rounded-sm p-1 transition-fast">▶</button>
      </div>

      <!-- Day Names -->
      <div class="rb-cal-grid px-3 pt-3">
        <div class="rb-cal-day-name text-xs font-bold text-muted text-center py-1" *ngFor="let d of dayNames">{{ d }}</div>

        <!-- Empty day placeholders -->
        <div *ngFor="let e of emptyDays" class="rb-cal-cell"></div>

        <!-- Day cells -->
        <div *ngFor="let day of daysInMonth"
          class="rb-cal-cell text-sm text-center py-2 rounded-sm cursor-pointer transition-fast font-medium"
          [class.today]="isToday(day)"
          [class.selected]="isSelected(day)"
          [class.other-month]="false"
          (click)="selectDay(day)">
          {{ day }}
        </div>
      </div>

      <!-- Selected Date Footer -->
      <div *ngIf="selectedDate" class="rb-cal-footer px-4 py-2 border-t text-xs text-muted text-center">
        ✓ Selected: <strong class="text-primary">{{ selectedDate | date:'d MMMM yyyy' }}</strong>
      </div>
    </div>
  `,
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() selectedDate: Date | null = null;
  @Output() selectedDateChange = new EventEmitter<Date>();

  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();

  monthNames = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December'];
  dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  daysInMonth: number[] = [];
  emptyDays: null[] = [];

  ngOnInit() { this.buildCalendar(); }

  buildCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.emptyDays = Array(firstDay).fill(null);
    this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
  }

  prevMonth() {
    if (this.currentMonth === 0) { this.currentMonth = 11; this.currentYear--; }
    else { this.currentMonth--; }
    this.buildCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) { this.currentMonth = 0; this.currentYear++; }
    else { this.currentMonth++; }
    this.buildCalendar();
  }

  selectDay(day: number) {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.selectedDateChange.emit(this.selectedDate);
  }

  isToday(day: number): boolean {
    const now = new Date();
    return day === now.getDate() && this.currentMonth === now.getMonth() && this.currentYear === now.getFullYear();
  }

  isSelected(day: number): boolean {
    if (!this.selectedDate) return false;
    return day === this.selectedDate.getDate() &&
           this.currentMonth === this.selectedDate.getMonth() &&
           this.currentYear === this.selectedDate.getFullYear();
  }
}
