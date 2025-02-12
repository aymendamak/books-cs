import { computed, inject, Injectable, signal } from '@angular/core';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { AuthorService } from './author.service';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpen = signal(false);
  modalType = signal<'details' | 'create' | null>(null);
  modalAction = signal<'author' | 'book' | null>(null);
  currentBook = signal<Book | null>(null);

  authorService = inject(AuthorService);
  bookService = inject(BookService);

  openDetailsModal(book: Book) {
    this.currentBook.set(book);
    this.modalType.set('details');
    this.isOpen.set(true);
  }

  openCreateModal(type: 'author' | 'book') {
    this.modalType.set('create');
    this.isOpen.set(true);
    this.modalAction.set(type);
  }

  closeModal() {
    this.isOpen.set(false);
    this.modalType.set(null);
    this.currentBook.set(null);
  }

  createNewAuthor(author: Author) {
    this.authorService.addAuthor(author).subscribe({
      next: (response) => {
        this.isOpen.set(false);
        this.modalType.set(null);
        this.modalAction.set(null);
      },
      error: (error) => {
        console.error('Error creating author:', error);
      },
      complete: () => {},
    });
  }

  createNewBook(book: Book) {
    this.bookService.addBook(book).subscribe((response) => {
      this.isOpen.set(false);
      this.modalType.set(null);
      this.modalAction.set(null);
    });
  }
}
