import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-side-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Backdrop -->
    <div *ngIf="visible" class="rb-side-form-overlay pos-fixed inset-0 z-drawer-overlay animate-fade-in" (click)="closeOnBackdrop && close()"></div>

    <!-- Slide-up/Slide-in Form Panel -->
    <div class="rb-side-form pos-fixed z-drawer d-flex flex-col bg-card"
      [class.visible]="visible"
      [class.rb-side-form-bottom]="mode === 'bottom'"
      [class.rb-side-form-right]="mode === 'right'">

      <!-- Header -->
      <div class="rb-side-form-header d-flex align-center justify-between px-5 py-4 border-b flex-shrink-0">
        <div>
          <h3 class="text-lg font-bold m-0">{{ title }}</h3>
          <p *ngIf="subtitle" class="text-xs text-muted m-0 mt-1">{{ subtitle }}</p>
        </div>
        <button (click)="close()" class="border-none bg-transparent cursor-pointer text-muted font-bold text-xl transition-fast">✕</button>
      </div>

      <!-- Scrollable Form Body -->
      <div class="rb-side-form-body overflow-y-auto flex-grow-1 px-5 py-4">
        <ng-content></ng-content>
      </div>

      <!-- Sticky Footer Buttons -->
      <div class="rb-side-form-footer d-flex justify-end gap-2 px-5 py-4 border-t flex-shrink-0 bg-card">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./side-form.component.scss']
})
export class SideFormComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() mode: 'bottom' | 'right' = 'right';
  @Input() closeOnBackdrop = true;

  @Output() visibleChange = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
