import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-skeleton-wrapper d-flex flex-col gap-2">
      <div *ngFor="let row of rows"
        class="rb-skeleton"
        [style.width]="row.width || '100%'"
        [style.height]="row.height || '16px'"
        [style.border-radius]="row.circle ? '50%' : 'var(--radius-sm)'">
      </div>
    </div>
  `,
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() rows: { width?: string; height?: string; circle?: boolean }[] = [
    { width: '40%', height: '12px' },
    { width: '100%', height: '16px' },
    { width: '100%', height: '16px' },
    { width: '70%', height: '16px' },
  ];
}
