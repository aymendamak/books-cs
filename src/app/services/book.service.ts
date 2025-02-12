import { Injectable, signal, computed, inject } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  public http = inject(HttpClient);
  // private booksSignal = signal<Book[]>([
  //   {
  //     id: 1,
  //     title: 'To Kill a Mockingbird',
  //     author: 'Harper Lee',
  //     description: 'A classic of modern American literature.',
  //   },
  //   {
  //     id: 2,
  //     title: '1984',
  //     author: 'George Orwell',
  //     description: 'A dystopian social science fiction novel.',
  //   },
  //   {
  //     id: 3,
  //     title: 'The Great Gatsby',
  //     author: 'F. Scott Fitzgerald',
  //     description: 'A novel of the Jazz Age.',
  //   },
  //   {
  //     id: 4,
  //     title: 'To Kill a Mockingbird',
  //     author: 'Harper Lee',
  //     description: 'A classic of modern American literature.',
  //   },
  //   {
  //     id: 5,
  //     title: '1984',
  //     author: 'George Orwell',
  //     description: 'A dystopian social science fiction novel.',
  //   },
  //   {
  //     id: 6,
  //     title: 'The Great Gatsby',
  //     author: 'F. Scott Fitzgerald',
  //     description: 'A novel of the Jazz Age.',
  //   },
  // ]);

  private errorSignal = signal<string | null>(null);
  public error = computed(() => this.errorSignal());

  private booksSignal = signal<Book[]>([]);
  public books = computed(() => this.booksSignal());

  getAllBooks() {
    this.http
      .get<{ data: Book[] }>('http://localhost:8080/books')
      .subscribe((response) => {
        this.booksSignal.set(response.data);
        console.log('booksSignal', this.booksSignal());
      });
  }

  getBookById(id: number) {
    return computed(() => this.booksSignal().find((book) => book.id === id));
  }

  addBook(book: Book) {
    return this.http
      .post<{ data: Book }>('http://localhost:8080/books/create', book)
      .pipe(
        tap({
          next: (response) => {
            this.booksSignal.update((books) => [...books, response.data]);
          },
          error: (error) => {
            console.error('Error adding book:', error);
            this.errorSignal.set(error.error.errors[0].msg);
          },
        })
      );
  }

  updateBook(updatedBook: Book) {
    this.booksSignal.update((books) =>
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  }

  deleteBook(id: number) {
    this.booksSignal.update((books) => books.filter((book) => book.id !== id));
  }

  clearError() {
    this.errorSignal.set(null);
  }
}
