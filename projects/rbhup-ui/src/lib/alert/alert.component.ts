import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" 
      class="rb-alert flex items-center gap-3 px-4 py-3 rounded-sm border transition-normal animate-fade-in"
      [class]="'rb-alert-' + type">
      <span class="rb-alert-icon font-bold text-base flex items-center justify-center">
        <i *ngIf="type === 'success'" class="fa-solid fa-circle-check text-success"></i>
        <i *ngIf="type === 'danger'" class="fa-solid fa-circle-xmark text-danger"></i>
        <i *ngIf="type === 'warning'" class="fa-solid fa-triangle-exclamation text-warning"></i>
        <i *ngIf="type === 'info'" class="fa-solid fa-circle-info text-info"></i>
      </span>
      <div class="grow">
        <p class="text-sm font-semibold m-0" *ngIf="title">{{ title }}</p>
        <p class="text-sm m-0" [class.mt-1]="title">{{ message }}</p>
      </div>
      <button *ngIf="dismissible" (click)="visible = false" class="rb-alert-close border-none bg-transparent cursor-pointer font-bold opacity-50 text-sm">✕</button>
    </div>
  `,
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = true;
  visible = true;
}
