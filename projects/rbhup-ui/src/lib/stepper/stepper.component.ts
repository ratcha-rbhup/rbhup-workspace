import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepItem {
  title: string;
  description?: string;
  subTitle?: string;
  icon?: string;
  status?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

@Component({
  selector: 'rb-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-stepper" [class]="'rb-stepper-' + variant">
      <!-- Background Connecting Line for Centered and Timeline Steppers -->
      <div *ngIf="variant === 'centered' || variant === 'timeline'" class="rb-stepper-progress-line-track">
        <div class="rb-stepper-progress-line-fill transition-normal" [style.width.%]="getProgressPercent()"></div>
      </div>

      <div *ngFor="let step of steps; let i = index" 
        class="rb-step-item"
        [class.active]="currentStep === i"
        [class.completed]="currentStep > i"
        [class.last]="i === steps.length - 1"
        [class]="'rb-step-' + (step.status || 'primary')">
        
        <!-- Vertical connector line (inside vertical step item) -->
        <div *ngIf="variant === 'vertical' && i < steps.length - 1" class="rb-step-vertical-line" [class.completed]="currentStep > i"></div>

        <div class="rb-step-container flex items-center" (click)="onStepClick(i)">
          <!-- Step Circle / Node -->
          <div class="rb-step-circle flex items-center justify-center rounded-full font-bold transition-fast select-none cursor-pointer"
            [class.active]="currentStep === i"
            [class.completed]="currentStep > i"
            [class]="step.status ? 'rb-step-circle-' + step.status : ''">
            <ng-container *ngIf="step.icon; else defaultIcon">
              <i *ngIf="isFontAwesome(step.icon); else textIcon" [class]="step.icon"></i>
              <ng-template #textIcon>{{ step.icon }}</ng-template>
            </ng-container>
            <ng-template #defaultIcon>
              <i *ngIf="currentStep > i" class="fa-solid fa-check"></i>
              <span *ngIf="currentStep <= i">{{ i + 1 }}</span>
            </ng-template>
          </div>

          <!-- Step Label Content -->
          <div class="rb-step-content">
            <div class="flex items-center gap-1.5 flex-wrap justify-center-centered">
              <p class="text-sm font-bold m-0 transition-fast rb-step-title" 
                [class.text-primary]="currentStep === i && !step.status" 
                [class.text-muted]="currentStep < i && !step.status">
                {{ step.title }}
              </p>
              <span *ngIf="step.subTitle" class="text-xxs text-muted font-semibold uppercase rb-step-subtitle">{{ step.subTitle }}</span>
            </div>
            <p *ngIf="step.description" class="text-xs text-muted m-0 mt-0.5 rb-step-description">{{ step.description }}</p>
          </div>
        </div>

        <!-- Horizontal line between circles (for default horizontal) -->
        <div *ngIf="variant === 'horizontal' && i < steps.length - 1" class="rb-step-line grow mr-3 rounded-full" [class.completed]="currentStep > i"></div>
      </div>
    </div>
  `,
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  @Input() steps: StepItem[] = [];
  @Input() currentStep = 0;
  @Input() variant: 'horizontal' | 'centered' | 'vertical' | 'timeline' = 'horizontal';
  @Output() currentStepChange = new EventEmitter<number>();

  onStepClick(idx: number) {
    if (idx <= this.currentStep || idx === this.currentStep + 1) {
      this.currentStep = idx;
      this.currentStepChange.emit(idx);
    }
  }

  isFontAwesome(icon?: string): boolean {
    return !!icon && icon.includes('fa-');
  }

  getProgressPercent(): number {
    if (this.steps.length <= 1) return 0;
    return (this.currentStep / (this.steps.length - 1)) * 100;
  }
}
