import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="rb-checkbox d-inline-flex align-center gap-2 cursor-pointer select-none" [class.disabled]="disabled">
      <div class="rb-checkbox-box d-flex align-center justify-center transition-fast rounded-xs"
        [class.checked]="checked"
        [class.disabled]="disabled"
        (click)="!disabled && toggle()">
        <span *ngIf="checked" class="text-white font-bold" style="font-size:10px; line-height:1;">✓</span>
      </div>
      <span class="text-sm" [class.text-muted]="disabled">{{ label }}</span>
    </label>
  `,
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
