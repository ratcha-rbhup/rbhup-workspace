import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem { id: string; label: string; icon?: string; }

@Component({
  selector: 'rb-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-tabs">
      <div class="rb-tabs-nav d-flex border-b overflow-x-auto">
        <button
          *ngFor="let tab of tabs"
          (click)="select(tab)"
          class="rb-tab-btn px-4 py-2 text-sm font-semibold cursor-pointer border-none bg-transparent transition-fast select-none"
          [class.active]="activeTab === tab.id">
          <span *ngIf="tab.icon">{{ tab.icon }}&nbsp;</span>{{ tab.label }}
        </button>
      </div>
      <div class="rb-tabs-content pt-4 animate-fade-in">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';
  @Output() activeTabChange = new EventEmitter<string>();

  select(tab: TabItem) {
    this.activeTab = tab.id;
    this.activeTabChange.emit(tab.id);
  }
}
