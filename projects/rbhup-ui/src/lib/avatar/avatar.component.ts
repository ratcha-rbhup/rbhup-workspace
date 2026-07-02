import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="rb-avatar"
      [class]="'rb-avatar-' + size"
      [class.rb-avatar-circle]="shape === 'circle'"
      [class.rb-avatar-square]="shape === 'square'"
      [class.rb-avatar-group-item]="group"
      [style.background-color]="hasImage && !imageError ? 'transparent' : avatarBgColor"
      [style.color]="avatarTextColor">
      
      <img 
        *ngIf="src && !imageError" 
        [src]="src" 
        [alt]="name"
        (error)="onImageError()"
        class="rb-avatar-img">

      <span *ngIf="(!src || imageError) && initials" class="rb-avatar-text">
        {{ initials }}
      </span>

      <span *ngIf="(!src || imageError) && !initials" class="rb-avatar-fallback">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rb-avatar-fallback-icon">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </span>
    </div>
  `,
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() src?: string;
  @Input() name = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() shape: 'circle' | 'square' = 'circle';
  @Input() group = false;

  initials = '';
  avatarBgColor = '';
  avatarTextColor = '';
  imageError = false;

  private colorPalettes = [
    { bg: 'var(--rb-blue-100)', text: 'var(--rb-blue-800)' },
    { bg: 'var(--rb-indigo-100)', text: 'var(--rb-indigo-800)' },
    { bg: 'var(--rb-green-100)', text: 'var(--rb-green-800)' },
    { bg: 'var(--rb-orange-100)', text: 'var(--rb-orange-800)' },
    { bg: 'var(--rb-red-100)', text: 'var(--rb-red-800)' },
    { bg: 'var(--rb-sky-100)', text: 'var(--rb-sky-800)' },
    { bg: 'var(--rb-lime-100)', text: 'var(--rb-lime-800)' },
    { bg: 'var(--rb-amber-100)', text: 'var(--rb-amber-800)' },
  ];

  ngOnInit() {
    this.updateAvatar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name'] || changes['src']) {
      this.imageError = false;
      this.updateAvatar();
    }
  }

  get hasImage(): boolean {
    return !!this.src;
  }

  onImageError() {
    this.imageError = true;
  }

  private updateAvatar() {
    this.initials = this.getInitials(this.name);
    const colorIndex = this.getHashCode(this.name || 'default') % this.colorPalettes.length;
    const selectedColor = this.colorPalettes[colorIndex];
    this.avatarBgColor = selectedColor.bg;
    this.avatarTextColor = selectedColor.text;
  }

  private getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  private getHashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }
}
