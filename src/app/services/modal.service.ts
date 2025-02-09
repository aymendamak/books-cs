import { Injectable, signal } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpen = signal(false);
  modalType = signal<'details' | 'create' | null>(null);
  currentBook = signal<Book | null>(null);

  openDetailsModal(book: Book) {
    this.currentBook.set(book);
    this.modalType.set('details');
    this.isOpen.set(true);
  }

  openCreateModal() {
    this.modalType.set('create');
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
    this.modalType.set(null);
    this.currentBook.set(null);
  }
}
