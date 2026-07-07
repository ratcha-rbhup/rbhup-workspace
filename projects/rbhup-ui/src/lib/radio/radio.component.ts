import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RadioOption { value: string; label: string; }

@Component({
  selector: 'rb-radio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-1">
      <span *ngIf="label" class="text-xs font-semibold text-muted mb-1 select-none">{{ label }}</span>
      <label *ngFor="let opt of options"
        class="rb-radio inline-flex items-center gap-2 cursor-pointer select-none"
        [class.disabled]="disabled">
        <div class="rb-radio-circle flex items-center justify-center rounded-full transition-fast"
          [class.selected]="value === opt.value"
          (click)="!disabled && select(opt.value)">
          <div *ngIf="value === opt.value" class="rb-radio-dot rounded-full"></div>
        </div>
        <span class="text-sm">{{ opt.label }}</span>
      </label>
    </div>
  `,
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() label = '';
  @Input() options: RadioOption[] = [];
  @Input() value = '';
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();

  select(val: string) { this.value = val; this.valueChange.emit(val); }
}
