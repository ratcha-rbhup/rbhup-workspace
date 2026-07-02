import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-paginator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-paginator d-flex align-center justify-between px-4 py-3 border-t text-sm text-muted">
      <!-- Info label -->
      <div>
        Showing <span class="font-semibold text-main">{{ (page - 1) * pageSize + 1 }}</span> to 
        <span class="font-semibold text-main">{{ Math.min(page * pageSize, total) }}</span> of 
        <span class="font-semibold text-main">{{ total }}</span> results
      </div>

      <!-- Controls -->
      <div class="d-flex align-center gap-1">
        <button (click)="goToPage(1)" [disabled]="page === 1" class="rb-page-btn border rounded-sm px-2 py-1 bg-transparent cursor-pointer font-bold select-none">«</button>
        <button (click)="goToPage(page - 1)" [disabled]="page === 1" class="rb-page-btn border rounded-sm px-2 py-1 bg-transparent cursor-pointer font-bold select-none">‹</button>
        
        <span class="text-xs font-semibold px-2">Page {{ page }} of {{ totalPages }}</span>

        <button (click)="goToPage(page + 1)" [disabled]="page === totalPages" class="rb-page-btn border rounded-sm px-2 py-1 bg-transparent cursor-pointer font-bold select-none">›</button>
        <button (click)="goToPage(totalPages)" [disabled]="page === totalPages" class="rb-page-btn border rounded-sm px-2 py-1 bg-transparent cursor-pointer font-bold select-none">»</button>
      </div>
    </div>
  `,
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() page = 1;
  @Output() pageChange = new EventEmitter<number>();

  Math = Math;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
      this.pageChange.emit(p);
    }
  }
}
