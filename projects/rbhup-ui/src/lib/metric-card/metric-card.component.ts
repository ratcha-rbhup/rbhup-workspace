import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-metric-card border rounded-sm p-4 bg-card shadow-sm flex justify-between items-center">
      <div>
        <span class="text-xs font-semibold text-muted uppercase tracking-wider">{{ title }}</span>
        <h2 class="text-2xl font-bold text-main mt-1 mb-0">{{ value }}</h2>
        <div *ngIf="change !== undefined" class="flex items-center gap-1 mt-2 text-xs font-semibold">
          <span [class]="change >= 0 ? 'text-success' : 'text-danger'">
            {{ change >= 0 ? '▲' : '▼' }} {{ Math.abs(change) }}%
          </span>
          <span class="text-muted">vs last period</span>
        </div>
      </div>
      <div *ngIf="icon" class="rb-metric-icon flex items-center justify-center rounded-sm text-lg font-bold">
        <i *ngIf="isFontAwesome(icon); else textIcon" [class]="icon"></i>
        <ng-template #textIcon>{{ icon }}</ng-template>
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

  isFontAwesome(icon: string): boolean {
    return icon.includes('fa-');
  }
}
