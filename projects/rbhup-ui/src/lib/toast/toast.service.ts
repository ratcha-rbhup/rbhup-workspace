import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info' | 'primary';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts$ = new BehaviorSubject<ToastMessage[]>([]);
  public activeToasts = this.toasts$.asObservable();

  show(message: string, type: 'success' | 'danger' | 'warning' | 'info' | 'primary' = 'primary', duration = 3000) {
    const id = 'toast-' + Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = { id, message, type, duration };

    // Add to list
    const current = this.toasts$.value;
    this.toasts$.next([...current, newToast]);

    // Setup auto dismiss
    setTimeout(() => {
      this.dismiss(id);
    }, duration);
  }

  dismiss(id: string) {
    const filtered = this.toasts$.value.filter(t => t.id !== id);
    this.toasts$.next(filtered);
  }
}
