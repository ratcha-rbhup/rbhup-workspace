import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from './toast.service';

@Component({
  selector: 'rb-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-toast-container pos-fixed top-4 right-4 d-flex flex-col gap-2 z-toast">
      <div 
        *ngFor="let toast of toasts" 
        class="rb-toast card d-flex align-center justify-between gap-3 px-4 py-3 shadow-lg border-none animate-fade-in"
        [class.toast-primary]="toast.type === 'primary'"
        [class.toast-success]="toast.type === 'success'"
        [class.toast-danger]="toast.type === 'danger'"
        [class.toast-warning]="toast.type === 'warning'"
        [class.toast-info]="toast.type === 'info'"
      >
        <div class="d-flex align-center gap-2">
          <span class="toast-icon">
            <span *ngIf="toast.type === 'success'">✓</span>
            <span *ngIf="toast.type === 'danger'">✗</span>
            <span *ngIf="toast.type === 'warning'">!</span>
            <span *ngIf="toast.type === 'info'">ℹ</span>
            <span *ngIf="toast.type === 'primary'">★</span>
          </span>
          <span class="text-sm font-semibold">{{ toast.message }}</span>
        </div>
        <button (click)="dismiss(toast.id)" class="toast-close-btn cursor-pointer border-none bg-transparent font-bold">
          ✕
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: ToastMessage[] = [];
  private sub = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.sub.add(
      this.toastService.activeToasts.subscribe(t => {
        this.toasts = t;
      })
    );
  }

  dismiss(id: string) {
    this.toastService.dismiss(id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
