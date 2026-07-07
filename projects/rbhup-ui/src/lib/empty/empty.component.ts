import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-empty',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-empty py-8 px-6 text-center flex flex-col items-center justify-center">
      <!-- Custom Premium SVG Icons -->
      <div class="rb-empty-image mb-4">
        <!-- 1. Box Icon (default empty) -->
        <svg *ngIf="iconType === 'box'" class="rb-empty-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 6L8 16.5L32 27L56 16.5L32 6Z" stroke="var(--primary, var(--rb-blue-500))" stroke-width="2" stroke-linejoin="round" />
          <path d="M8 16.5V47.5L32 58V27L8 16.5Z" stroke="var(--border-color, var(--rb-slate-300))" stroke-width="2" stroke-linejoin="round" />
          <path d="M56 16.5V47.5L32 58V27L56 16.5Z" stroke="var(--border-color, var(--rb-slate-300))" stroke-width="2" stroke-linejoin="round" />
          <path d="M20 22.125L44 32.625" stroke="var(--border-color, var(--rb-slate-300))" stroke-width="1.5" stroke-linecap="round" />
        </svg>

        <!-- 2. Folder Icon -->
        <svg *ngIf="iconType === 'folder'" class="rb-empty-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 14C8 11.7909 9.79086 10 12 10H26L32 16H52C54.2091 16 56 17.7909 56 20V50C56 52.2091 54.2091 54 52 54H12C9.79086 54 8 52.2091 8 50V14Z" stroke="var(--border-color, var(--rb-slate-300))" stroke-width="2" stroke-linejoin="round" />
          <path d="M8 24H56" stroke="var(--primary, var(--rb-blue-500))" stroke-width="2" />
        </svg>

        <!-- 3. Search / Zoom Glass -->
        <svg *ngIf="iconType === 'search'" class="rb-empty-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="18" stroke="var(--border-color, var(--rb-slate-300))" stroke-width="2" />
          <path d="M41 41L56 56" stroke="var(--primary, var(--rb-blue-500))" stroke-width="3" stroke-linecap="round" />
          <line x1="20" y1="28" x2="36" y2="28" stroke="var(--border-color, var(--rb-slate-300))" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>

      <!-- Text details -->
      <h3 class="rb-empty-title m-0 text-base font-bold text-main">{{ title }}</h3>
      <p *ngIf="description" class="rb-empty-description text-sm text-muted mt-2 max-w-sm">{{ description }}</p>

      <!-- Custom Actions / Buttons Slot -->
      <div class="rb-empty-actions mt-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent {
  @Input() title = 'ไม่พบข้อมูล';
  @Input() description = 'ยังไม่มีข้อมูลที่จะแสดงผลในขณะนี้';
  @Input() iconType: 'box' | 'folder' | 'search' = 'box';
}
