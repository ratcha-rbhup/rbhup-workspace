import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-textarea',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-1">
      <label *ngIf="label" class="text-xs font-semibold text-muted select-none">{{ label }}</label>
      <textarea
        [placeholder]="placeholder"
        [disabled]="disabled"
        [rows]="rows"
        [value]="value"
        (input)="onInput($event)"
        class="rb-textarea w-full px-3 py-2 border rounded-sm transition-fast font-sans text-sm"
        [class.rb-textarea-error]="error">
      </textarea>
      <span *ngIf="error" class="text-xs text-danger">{{ error }}</span>
    </div>
  `,
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() rows = 4;
  @Input() value = '';
  @Input() error = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(e: Event) {
    const val = (e.target as HTMLTextAreaElement).value;
    this.value = val;
    this.valueChange.emit(val);
  }
}
