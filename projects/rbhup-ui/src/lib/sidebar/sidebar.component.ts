import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  badgeType?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

@Component({
  selector: 'rb-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Mobile Top Bar Toggle -->
    <div class="rb-sidebar-mobile-toggle flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-2">
        <button class="menu-btn cursor-pointer bg-transparent border-none" (click)="toggleMobileOpen()">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <span class="logo-title font-extrabold text-primary" *ngIf="logoText">{{ logoText }}</span>
      </div>
    </div>

    <!-- Backdrop Overlay for Mobile -->
    <div class="rb-sidebar-overlay" *ngIf="mobileOpen" (click)="closeMobile()"></div>

    <!-- Main Sidebar Container -->
    <aside class="rb-sidebar" [class.rb-sidebar-mobile-open]="mobileOpen">
      <!-- Header Area -->
      <div class="rb-sidebar-header flex items-center gap-3 border-b" *ngIf="logoText || logoSrc">
        <img *ngIf="logoSrc" [src]="logoSrc" alt="Logo" class="rb-sidebar-logo">
        <div class="rb-sidebar-brand-wrapper">
          <span class="rb-sidebar-brand font-extrabold text-main">{{ logoText }}</span>
        </div>
        <button class="rb-sidebar-close-mobile-btn border-none bg-transparent cursor-pointer ml-auto" (click)="closeMobile()">✕</button>
      </div>

      <!-- Search Bar -->
      <div class="rb-sidebar-search py-3 border-b" *ngIf="searchable">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            [placeholder]="searchPlaceholder" 
            class="search-input"
            [(ngModel)]="searchText"
            (ngModelChange)="onSearchChange($event)">
          <button *ngIf="searchText" class="clear-search-btn bg-transparent border-none cursor-pointer p-0" (click)="clearSearch()">✕</button>
        </div>
      </div>

      <!-- Navigation Menu Items -->
      <nav class="rb-sidebar-nav py-3 flex flex-col gap-1">
        <button 
          *ngFor="let item of filteredItems" 
          (click)="onItemClick(item)"
          class="rb-sidebar-item-btn flex items-center justify-between"
          [class.active]="activeId === item.id">
          
          <div class="flex items-center gap-3">
            <span *ngIf="item.icon" class="rb-sidebar-item-icon">
              <i *ngIf="isFontAwesome(item.icon); else textIcon" [class]="item.icon"></i>
              <ng-template #textIcon>{{ item.icon }}</ng-template>
            </span>
            <span class="rb-sidebar-item-label">{{ item.label }}</span>
          </div>

          <span 
            *ngIf="item.badge" 
            class="rb-sidebar-item-badge text-xs" 
            [class]="item.badgeType ? 'rb-sidebar-item-badge-' + item.badgeType : 'rb-sidebar-item-badge-danger'">
            {{ item.badge }}
          </span>
        </button>

        <div *ngIf="filteredItems.length === 0" class="rb-sidebar-empty text-xs text-center py-6 text-muted">
          ไม่พบรายการค้นหา
        </div>
      </nav>

      <!-- Bottom Slot for Content -->
      <div class="rb-sidebar-footer mt-auto border-t pt-3">
        <ng-content select="[footer]"></ng-content>
      </div>
    </aside>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() items: SidebarItem[] = [];
  @Input() logoText = 'My App';
  @Input() logoSrc = '';
  @Input() searchable = true;
  @Input() searchPlaceholder = 'ค้นหารายการ...';
  @Input() activeId = '';
  @Input() mobileOpen = false;

  @Output() activeIdChange = new EventEmitter<string>();
  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() mobileOpenChange = new EventEmitter<boolean>();

  searchText = '';

  get filteredItems(): SidebarItem[] {
    if (!this.searchable || !this.searchText.trim()) {
      return this.items;
    }
    const query = this.searchText.trim().toLowerCase();
    return this.items.filter(item => 
      item.label.toLowerCase().includes(query) || 
      (item.badge && item.badge.toLowerCase().includes(query)) ||
      item.id.toLowerCase().includes(query)
    );
  }

  toggleMobileOpen() {
    this.mobileOpen = !this.mobileOpen;
    this.mobileOpenChange.emit(this.mobileOpen);
  }

  closeMobile() {
    this.mobileOpen = false;
    this.mobileOpenChange.emit(this.mobileOpen);
  }

  onItemClick(item: SidebarItem) {
    this.activeId = item.id;
    this.activeIdChange.emit(item.id);
    this.itemClick.emit(item);
    this.closeMobile();
  }

  onSearchChange(val: string) {
    this.searchChange.emit(val);
  }

  clearSearch() {
    this.searchText = '';
    this.onSearchChange('');
  }

  isFontAwesome(icon: string): boolean {
    return icon.includes('fa-');
  }
}
