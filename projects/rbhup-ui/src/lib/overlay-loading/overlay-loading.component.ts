import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-overlay-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="rb-overlay pos-fixed inset-0 d-flex flex-col align-center justify-center z-loading animate-fade-in">
      <div class="spinner spinner-lg mb-3"></div>
      <p *ngIf="message" class="text-sm font-semibold text-white m-0">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./overlay-loading.component.scss']
})
export class OverlayLoadingComponent {
  @Input() visible = false;
  @Input() message = 'กำลังโหลด...';
}
