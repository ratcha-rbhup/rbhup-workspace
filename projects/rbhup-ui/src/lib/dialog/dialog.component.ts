import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="visible" 
      class="rb-dialog-overlay pos-fixed inset-0 d-flex align-center justify-center z-modal-overlay animate-fade-in"
      (click)="onBackdropClick($event)"
    >
      <div 
        class="rb-dialog card shadow-modal animate-slide-up flex-col d-flex border-none"
        [class.rb-dialog-sm]="size === 'sm'"
        [class.rb-dialog-md]="size === 'md'"
        [class.rb-dialog-lg]="size === 'lg'"
        (click)="$event.stopPropagation()"
      >
        <!-- Dialog Header -->
        <div class="rb-dialog-header d-flex align-center justify-between pb-3 border-b mb-3">
          <h3 class="text-lg font-bold m-0 text-primary">{{ title }}</h3>
          <button (click)="close()" class="rb-dialog-close-btn d-flex align-center justify-center cursor-pointer border-none bg-transparent text-muted font-bold transition-fast">
            ✕
          </button>
        </div>

        <!-- Dialog Body -->
        <div class="rb-dialog-body text-sm text-main overflow-y-auto mb-4 flex-grow-1">
          <ng-content></ng-content>
        </div>

        <!-- Dialog Footer -->
        <div class="rb-dialog-footer d-flex justify-end gap-2 border-t pt-3">
          <ng-content select="[footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() closeOnBackdrop = true;

  @Output() visibleChange = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onBackdropClick(event: Event) {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }
}
