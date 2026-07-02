import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DialogService } from './dialog.service';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'rb-dialog-outlet',
  standalone: true,
  imports: [CommonModule, DialogComponent],
  template: `
    <rb-dialog 
      [title]="title" 
      [(visible)]="visible" 
      (visibleChange)="onVisibleChange($event)"
    >
      <p class="m-0 text-sm">{{ message }}</p>
      
      <div footer>
        <button (click)="cancel()" class="btn-cancel bg-light-gray text-dark border-none rounded-sm px-3 py-2 cursor-pointer transition-fast">
          Cancel
        </button>
        <button (click)="confirm()" class="btn-confirm bg-primary text-white border-none rounded-sm px-3 py-2 cursor-pointer transition-fast ml-2">
          Confirm
        </button>
      </div>
    </rb-dialog>
  `,
  styles: [`
    .btn-cancel, .btn-confirm {
      &:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      &:active {
        transform: translateY(0);
      }
    }
  `]
})
export class DialogOutletComponent implements OnInit, OnDestroy {
  visible = false;
  title = '';
  message = '';
  private sub = new Subscription();

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.sub.add(
      this.dialogService.visible$.subscribe(v => this.visible = v)
    );
    this.sub.add(
      this.dialogService.title$.subscribe(t => this.title = t)
    );
    this.sub.add(
      this.dialogService.message$.subscribe(m => this.message = m)
    );
  }

  confirm() {
    this.dialogService.confirm();
  }

  cancel() {
    this.dialogService.cancel();
  }

  onVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialogService.close();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
