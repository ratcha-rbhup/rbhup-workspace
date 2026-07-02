import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="rb-badge"
      [class]="'rb-badge-' + type"
      [class.rb-badge-dot]="dot"
      [class.rb-badge-has-content]="!dot && displayContent">
      {{ dot ? '' : displayContent }}
    </span>
  `,
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() content: string | number = '';
  @Input() type: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'danger';
  @Input() dot = false;
  @Input() max = 99;

  get displayContent(): string {
    if (typeof this.content === 'number') {
      return this.content > this.max ? `${this.max}+` : this.content.toString();
    }
    return this.content ? this.content.toString() : '';
  }
}
