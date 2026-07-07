import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from './toast.service';

@Component({
  selector: 'rb-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-toast-container fixed top-4 right-4 flex flex-col gap-2 z-toast">
      <div 
        *ngFor="let toast of toasts" 
        class="rb-toast card flex items-center justify-between gap-3 px-4 py-3 shadow-lg border-none animate-fade-in"
        [class.toast-primary]="toast.type === 'primary'"
        [class.toast-success]="toast.type === 'success'"
        [class.toast-danger]="toast.type === 'danger'"
        [class.toast-warning]="toast.type === 'warning'"
        [class.toast-info]="toast.type === 'info'"
      >
        <div class="flex items-center gap-2">
          <span class="toast-icon flex items-center justify-center">
            <i *ngIf="toast.type === 'success'" class="fa-solid fa-circle-check text-success"></i>
            <i *ngIf="toast.type === 'danger'" class="fa-solid fa-circle-xmark text-danger"></i>
            <i *ngIf="toast.type === 'warning'" class="fa-solid fa-triangle-exclamation text-warning"></i>
            <i *ngIf="toast.type === 'info'" class="fa-solid fa-circle-info text-info"></i>
            <i *ngIf="toast.type === 'primary'" class="fa-solid fa-bell text-primary"></i>
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
