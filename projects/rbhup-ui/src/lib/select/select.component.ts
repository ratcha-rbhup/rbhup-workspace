import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'rb-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-select-wrapper flex-col flex gap-1 relative">
      <label *ngIf="label" class="rb-select-label text-xs font-semibold text-muted select-none">
        {{ label }}
      </label>

      <!-- Selector Box -->
      <div 
        [class.disabled]="disabled"
        (click)="toggleDropdown()"
        class="rb-select-control flex items-center justify-between px-3 py-2 border rounded-sm cursor-pointer select-none transition-fast font-sans"
        [class.open]="isOpen"
      >
        <span class="text-sm" [class.text-muted]="!selectedLabel">
          {{ selectedLabel || placeholder }}
        </span>
        <span class="rb-select-arrow transition-fast" [class.rotated]="isOpen">▼</span>
      </div>

      <!-- Options Dropdown -->
      <ul *ngIf="isOpen && !disabled" class="rb-select-dropdown absolute w-full border rounded-sm shadow-md bg-card p-0 m-0 z-drawer overflow-y-auto animate-fade-in">
        <li 
          *ngFor="let option of options" 
          (click)="selectOption(option)"
          class="rb-select-option px-3 py-2 text-sm cursor-pointer transition-fast list-none"
          [class.selected]="option.value === value"
        >
          {{ option.label }}
        </li>
        <li *ngIf="options.length === 0" class="rb-select-empty px-3 py-2 text-sm text-muted text-center list-none">
          No options available
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() label = '';
  @Input() placeholder = 'Select an option...';
  @Input() options: SelectOption[] = [];
  @Input() disabled = false;
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  get selectedLabel(): string {
    const selectedOpt = this.options.find(opt => opt.value === this.value);
    return selectedOpt ? selectedOpt.label : '';
  }

  toggleDropdown() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SelectOption) {
    this.value = option.value;
    this.valueChange.emit(option.value);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
