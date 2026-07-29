import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
// البيانات اللي الـ Component بيستقبلها من برة
  @Input() totalCount!: number;
  @Input() pageNumber!: number;
  @Input() pageSize!: number;

  // الحدث اللي بيرجع رقم الصفحة الجديد للـ Parent Component
  @Output() pageChanged = new EventEmitter<number>();
  
  showBoundaryLinks = true;

  onPagerChange(event: any): void {
    // ngx-bootstrap بترجع رقم الصفحة جوة event.page
    this.pageChanged.emit(event);
  }
}
