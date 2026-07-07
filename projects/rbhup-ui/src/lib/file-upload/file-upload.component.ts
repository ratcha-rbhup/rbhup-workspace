import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rb-file-upload w-full">
      <label *ngIf="label" class="text-xs font-semibold text-muted select-none block mb-1">{{ label }}</label>
      
      <!-- Drop Area -->
      <div class="rb-upload-area border-dashed rounded-sm p-6 text-center cursor-pointer transition-fast"
        [class.dragover]="isDragOver"
        (dragover)="onDragOver($event)"
        (dragleave)="isDragOver = false"
        (drop)="onDrop($event)"
        (click)="fileInput.click()">
        
        <input type="file" #fileInput class="hidden" [multiple]="multiple" (change)="onFileSelect($event)">
        <i class="fa-solid fa-cloud-arrow-up text-2xl mb-2 text-muted block"></i>
        <p class="text-sm font-semibold m-0 text-main">{{ dragLabel }}</p>
        <p class="text-xs text-muted m-0 mt-1">Supported formats: {{ accept || 'All files' }}</p>
      </div>

      <!-- File List -->
      <div *ngIf="files.length > 0" class="file-list mt-3 flex flex-col gap-2">
        <div *ngFor="let file of files; let idx = index" class="file-item flex items-center justify-between p-2 border rounded-xs bg-card text-xs">
          <div class="flex items-center gap-2 overflow-hidden">
            <i class="fa-solid fa-file-lines text-muted"></i>
            <span class="file-name font-semibold text-main truncate" style="max-width: 240px;">{{ file.name }}</span>
            <span class="file-size text-muted">({{ formatBytes(file.size) }})</span>
          </div>
          <button (click)="removeFile(idx)" class="remove-btn border-none bg-transparent cursor-pointer font-bold text-muted transition-fast">✕</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() label = '';
  @Input() dragLabel = 'Drag and drop files here, or click to upload';
  @Input() multiple = false;
  @Input() accept = '';
  
  files: File[] = [];
  @Output() filesChange = new EventEmitter<File[]>();

  isDragOver = false;

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragOver = true;
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragOver = false;
    if (e.dataTransfer?.files) {
      this.addFiles(e.dataTransfer.files);
    }
  }

  onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  addFiles(fileList: FileList) {
    if (this.multiple) {
      Array.from(fileList).forEach(f => this.files.push(f));
    } else {
      this.files = [fileList[0]];
    }
    this.filesChange.emit(this.files);
  }

  removeFile(idx: number) {
    this.files.splice(idx, 1);
    this.filesChange.emit(this.files);
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
