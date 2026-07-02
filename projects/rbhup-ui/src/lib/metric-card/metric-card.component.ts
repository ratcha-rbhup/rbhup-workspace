import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-metric-card border rounded-sm p-4 bg-card shadow-sm d-flex justify-between align-center">
      <div>
        <span class="text-xs font-semibold text-muted uppercase tracking-wider">{{ title }}</span>
        <h2 class="text-2xl font-bold text-main mt-1 mb-0">{{ value }}</h2>
        <div *ngIf="change !== undefined" class="d-flex align-center gap-1 mt-2 text-xs font-semibold">
          <span [class]="change >= 0 ? 'text-success' : 'text-danger'">
            {{ change >= 0 ? '▲' : '▼' }} {{ Math.abs(change) }}%
          </span>
          <span class="text-muted">vs last period</span>
        </div>
      </div>
      <div *ngIf="icon" class="rb-metric-icon d-flex align-center justify-center rounded-sm text-lg font-bold">
        {{ icon }}
      </div>
    </div>
  `,
  styleUrls: ['./metric-card.component.scss']
})
export class MetricCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() change?: number;
  @Input() icon = '';

  Math = Math;
}
