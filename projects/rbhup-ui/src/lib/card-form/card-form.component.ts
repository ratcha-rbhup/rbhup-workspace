import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-card-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-card-form card d-flex flex-col gap-0" [class.card-hoverable]="hoverable">
      <!-- Card Form Header -->
      <div *ngIf="title" class="rb-card-form-header px-5 pt-5 pb-3 border-b mb-4">
        <div class="d-flex align-center justify-between">
          <div>
            <h3 class="text-base font-bold m-0 text-main">{{ title }}</h3>
            <p *ngIf="subtitle" class="text-xs text-muted m-0 mt-1">{{ subtitle }}</p>
          </div>
          <ng-content select="[header-action]"></ng-content>
        </div>
      </div>

      <!-- Card Form Body -->
      <div class="rb-card-form-body d-flex flex-col gap-4 px-5" [class.py-5]="!title">
        <ng-content></ng-content>
      </div>

      <!-- Card Form Footer -->
      <div class="rb-card-form-footer d-flex justify-end gap-2 px-5 pt-4 pb-5 mt-4 border-t">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() hoverable = false;
}
