import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="rb-toggle d-inline-flex align-center gap-3 cursor-pointer select-none" [class.disabled]="disabled">
      <div class="rb-toggle-track rounded-full pos-relative transition-fast"
        [class.active]="checked"
        [class.disabled]="disabled"
        (click)="!disabled && toggle()">
        <div class="rb-toggle-thumb pos-absolute rounded-full transition-fast shadow-sm" [class.active]="checked"></div>
      </div>
      <span class="text-sm font-medium" [class.text-muted]="disabled">{{ label }}</span>
    </label>
  `,
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
