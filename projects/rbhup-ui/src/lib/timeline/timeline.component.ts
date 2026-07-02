import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineItem {
  title: string;
  subtitle?: string;
  description?: string;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  date?: string;
  icon?: string;
}

@Component({
  selector: 'rb-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-timeline" [class.rb-timeline-alternate]="mode === 'alternate'">
      <div 
        *ngFor="let item of items; let i = index; let last = last" 
        class="rb-timeline-item"
        [class.rb-timeline-item-left]="mode === 'alternate' && i % 2 === 0"
        [class.rb-timeline-item-right]="mode === 'alternate' && i % 2 !== 0">
        
        <!-- Tail/Line -->
        <div *ngIf="!last" class="rb-timeline-item-tail"></div>
        
        <!-- Node/Dot -->
        <div 
          class="rb-timeline-item-head"
          [class]="item.type ? 'rb-timeline-item-head-' + item.type : 'rb-timeline-item-head-primary'"
          [class.rb-timeline-item-head-custom]="!!item.icon">
          <span *ngIf="item.icon" class="rb-timeline-item-head-icon">{{ item.icon }}</span>
        </div>
        
        <!-- Content -->
        <div class="rb-timeline-item-content">
          <div class="rb-timeline-item-header d-flex align-center justify-between flex-wrap gap-1">
            <h4 class="rb-timeline-item-title m-0 text-sm font-semibold text-main">{{ item.title }}</h4>
            <span *ngIf="item.date" class="rb-timeline-item-date text-xs text-muted">{{ item.date }}</span>
          </div>
          <div *ngIf="item.subtitle" class="rb-timeline-item-subtitle text-xs text-muted mt-1">{{ item.subtitle }}</div>
          <p *ngIf="item.description" class="rb-timeline-item-desc text-sm text-secondary mt-2 mb-0">{{ item.description }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  @Input() items: TimelineItem[] = [];
  @Input() mode: 'left' | 'alternate' = 'left';
}
