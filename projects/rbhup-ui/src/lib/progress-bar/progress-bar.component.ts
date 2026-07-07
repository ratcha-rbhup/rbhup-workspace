import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-progress-wrapper flex flex-col gap-1">
      <div *ngIf="label" class="flex justify-between items-center mb-1">
        <span class="text-xs font-semibold text-muted">{{ label }}</span>
        <span class="text-xs font-bold text-primary">{{ value }}%</span>
      </div>
      <div class="rb-progress-track rounded-full overflow-hidden" [style.height]="height">
        <div class="rb-progress-bar rounded-full transition-normal"
          [style.width]="value + '%'"
          [class]="'rb-progress-' + color">
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() label = '';
  @Input() height = '8px';
  @Input() color: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
}
