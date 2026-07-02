import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepItem {
  title: string;
  description?: string;
}

@Component({
  selector: 'rb-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-stepper d-flex align-center justify-between w-full mb-6">
      <div *ngFor="let step of steps; let i = index" class="rb-step-item d-flex align-center flex-grow-1" [class.last]="i === steps.length - 1">
        <!-- Step Icon / Index -->
        <div class="rb-step-circle d-flex align-center justify-center rounded-full font-bold transition-fast select-none cursor-pointer"
          [class.active]="currentStep === i"
          [class.completed]="currentStep > i"
          (click)="onStepClick(i)">
          <span *ngIf="currentStep > i">✓</span>
          <span *ngIf="currentStep <= i">{{ i + 1 }}</span>
        </div>

        <!-- Step Labels -->
        <div class="rb-step-content ml-3 pr-3">
          <p class="text-sm font-bold m-0 transition-fast" [class.text-primary]="currentStep === i" [class.text-muted]="currentStep < i">{{ step.title }}</p>
          <p *ngIf="step.description" class="text-xs text-muted m-0 mt-0.5">{{ step.description }}</p>
        </div>

        <!-- Divider Line -->
        <div *ngIf="i < steps.length - 1" class="rb-step-line flex-grow-1 mr-3 rounded-full" [class.completed]="currentStep > i"></div>
      </div>
    </div>
  `,
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  @Input() steps: StepItem[] = [];
  @Input() currentStep = 0;
  @Output() currentStepChange = new EventEmitter<number>();

  onStepClick(idx: number) {
    if (idx <= this.currentStep || idx === this.currentStep + 1) {
      this.currentStep = idx;
      this.currentStepChange.emit(idx);
    }
  }
}
