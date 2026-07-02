import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-tooltip-container d-inline-block pos-relative"
      (mouseenter)="show()"
      (mouseleave)="hide()">
      <ng-content></ng-content>
      <div *ngIf="visible"
        class="rb-tooltip pos-absolute px-2 py-1 text-xs text-white rounded-xs transition-fast shadow-md z-toast"
        [class]="'rb-tooltip-' + position">
        {{ text }}
      </div>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  @Input() text = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  visible = false;

  show() { this.visible = true; }
  hide() { this.visible = false; }
}
