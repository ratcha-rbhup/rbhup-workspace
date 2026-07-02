import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Backdrop -->
    <div *ngIf="visible" class="rb-drawer-overlay pos-fixed inset-0 z-drawer-overlay animate-fade-in" (click)="closeOnBackdrop && close()"></div>

    <!-- Drawer Panel -->
    <div class="rb-drawer pos-fixed z-drawer d-flex flex-col bg-card shadow-modal"
      [class.visible]="visible"
      [class.rb-drawer-left]="position === 'left'"
      [class.rb-drawer-right]="position === 'right'">

      <!-- Drawer Header -->
      <div class="rb-drawer-header d-flex align-center justify-between px-5 py-4 border-b flex-shrink-0">
        <h3 class="text-lg font-bold m-0 text-main">{{ title }}</h3>
        <button (click)="close()" class="border-none bg-transparent cursor-pointer text-muted font-bold text-lg transition-fast">✕</button>
      </div>

      <!-- Drawer Body -->
      <div class="rb-drawer-body overflow-y-auto flex-grow-1 px-5 py-4">
        <ng-content></ng-content>
      </div>

      <!-- Drawer Footer (optional) -->
      <div class="rb-drawer-footer px-5 py-4 border-t flex-shrink-0">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() position: 'left' | 'right' = 'right';
  @Input() width = '400px';
  @Input() closeOnBackdrop = true;

  @Output() visibleChange = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
