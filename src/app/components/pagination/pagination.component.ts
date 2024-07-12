import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.pageChange.emit(pageNumber);
  }
  calculateTotalPages() : number {
    return Math.ceil(this.totalItems / this.itemsPerPage);}

  // Méthodes pour gérer la pagination (par exemple, calcul du nombre total de pages, etc.)
}


