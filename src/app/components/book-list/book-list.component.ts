import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookItemComponent } from '../book-item/book-item.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, BookItemComponent],
  templateUrl: './book-list.component.html',
})
export class BookListComponent {
  bookService = inject(BookService);
  modalService = inject(ModalService);

  openCreateModal() {
    this.modalService.openCreateModal();
  }
}
