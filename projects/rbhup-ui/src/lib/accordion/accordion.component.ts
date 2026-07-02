import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-accordion border rounded-sm mb-2 overflow-hidden bg-card transition-fast">
      <div class="rb-accordion-header d-flex align-center justify-between px-4 py-3 cursor-pointer select-none"
        (click)="toggle()">
        <span class="text-sm font-semibold text-main">{{ title }}</span>
        <span class="rb-accordion-icon transition-normal" [class.rotated]="expanded">▼</span>
      </div>
      <div class="rb-accordion-content transition-normal" [style.max-height]="expanded ? '800px' : '0'">
        <div class="p-4 border-t text-sm text-grey">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @Input() title = '';
  @Input() expanded = false;
  @Output() expandedChange = new EventEmitter<boolean>();

  toggle() {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
