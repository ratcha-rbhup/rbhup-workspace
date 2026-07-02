import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private visibleSource = new BehaviorSubject<boolean>(false);
  private titleSource = new BehaviorSubject<string>('');
  private messageSource = new BehaviorSubject<string>('');

  public visible$ = this.visibleSource.asObservable();
  public title$ = this.titleSource.asObservable();
  public message$ = this.messageSource.asObservable();

  private confirmCallback?: () => void;
  private cancelCallback?: () => void;

  open(title: string, message: string, onConfirm?: () => void, onCancel?: () => void) {
    this.titleSource.next(title);
    this.messageSource.next(message);
    this.confirmCallback = onConfirm;
    this.cancelCallback = onCancel;
    this.visibleSource.next(true);
  }

  confirm() {
    if (this.confirmCallback) {
      this.confirmCallback();
    }
    this.close();
  }

  cancel() {
    if (this.cancelCallback) {
      this.cancelCallback();
    }
    this.close();
  }

  close() {
    this.visibleSource.next(false);
  }
}
