import { Injectable, signal, computed } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSignal = signal<Book[]>([
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A classic of modern American literature.',
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel.',
    },
    {
      id: 3,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel of the Jazz Age.',
    },
    {
      id: 4,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A classic of modern American literature.',
    },
    {
      id: 5,
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel.',
    },
    {
      id: 6,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel of the Jazz Age.',
    },
  ]);

  books = computed(() => this.booksSignal());

  getBookById(id: number) {
    return computed(() => this.booksSignal().find((book) => book.id === id));
  }

  addBook(book: Book) {
    this.booksSignal.update((books) => [
      ...books,
      { ...book, id: books.length + 1 },
    ]);
  }

  updateBook(updatedBook: Book) {
    this.booksSignal.update((books) =>
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  }

  deleteBook(id: number) {
    this.booksSignal.update((books) => books.filter((book) => book.id !== id));
  }
}
