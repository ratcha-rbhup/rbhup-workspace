import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

@Component({
  selector: 'rb-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, SkeletonComponent],
  template: `
    <div class="rb-table-container border rounded-sm overflow-hidden bg-card shadow-sm d-flex flex-col">
      <div class="overflow-x-auto w-full">
        <table class="rb-table w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th *ngFor="let col of columns"
                class="px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted select-none"
                [class.cursor-pointer]="col.sortable"
                (click)="col.sortable && sort(col.key)">
                <div class="d-flex align-center gap-1">
                  <span>{{ col.label }}</span>
                  <span *ngIf="col.sortable" class="text-xxs opacity-70">
                    {{ sortKey === col.key ? (sortOrder === 'asc' ? '▲' : '▼') : '↕' }}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading Skeleton State -->
            <tr *ngIf="loading">
              <td [attr.colspan]="columns.length" class="px-4 py-6">
                <rb-skeleton [rows]="[{width:'100%',height:'16px'},{width:'100%',height:'16px'},{width:'90%',height:'16px'}]"></rb-skeleton>
              </td>
            </tr>

            <!-- Empty state -->
            <tr *ngIf="!loading && data.length === 0">
              <td [attr.colspan]="columns.length" class="px-4 py-8 text-center text-sm text-muted">
                No records found.
              </td>
            </tr>

            <!-- Render Data Rows -->
            <ng-container *ngIf="!loading">
              <tr *ngFor="let row of data" class="border-b hover-bg transition-fast">
                <td *ngFor="let col of columns" class="px-4 py-3 text-sm text-main">
                  <!-- Custom slot projections via template interpolation if needed, or default text -->
                  {{ row[col.key] }}
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>

      <!-- Render embedded Paginator if enabled -->
      <rb-paginator *ngIf="totalCount > 0"
        [total]="totalCount"
        [pageSize]="pageSize"
        [(page)]="page"
        (pageChange)="pageChange.emit($event)">
      </rb-paginator>
    </div>
  `,
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  
  // Pagination
  @Input() totalCount = 0;
  @Input() pageSize = 10;
  @Input() page = 1;
  @Output() pageChange = new EventEmitter<number>();

  // Sorting
  @Output() sortChange = new EventEmitter<{ key: string; order: 'asc' | 'desc' }>();
  sortKey = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  sort(key: string) {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortOrder = 'asc';
    }
    this.sortChange.emit({ key: this.sortKey, order: this.sortOrder });
  }
}
