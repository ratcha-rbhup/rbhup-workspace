import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-input-wrapper flex-col d-flex gap-1">
      <label *ngIf="label" [for]="id" class="rb-input-label text-xs font-semibold text-muted select-none">
        {{ label }}
      </label>
      
      <div class="rb-input-container pos-relative">
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          class="rb-input w-full px-3 py-2 border rounded-sm transition-fast font-sans"
          [class.rb-input-error]="error"
          [class.rb-input-success]="success"
        />
      </div>

      <span *ngIf="error" class="rb-input-error-msg text-xs text-danger mt-0.5">
        {{ error }}
      </span>
    </div>
  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() id = 'rb-input-' + Math.random().toString(36).substr(2, 9);
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() value = '';
  @Input() error = '';
  @Input() success = false;

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.valueChange.emit(val);
  }
}
