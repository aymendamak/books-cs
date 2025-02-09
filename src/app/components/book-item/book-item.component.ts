// book-item.component.ts
import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'book-item.component.html',
})
export class BookItemComponent {
  @Input() book!: Book;

  constructor(public modalService: ModalService) {}

  openModal() {
    this.modalService.openDetailsModal(this.book);
  }

  // closeModal() {
  //   this.modalService.close();
  // }
}
