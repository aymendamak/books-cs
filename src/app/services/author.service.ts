import { Injectable, signal, computed } from '@angular/core';
import { Author } from '../models/author.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  private authorsSignal = signal<Author[]>([]);
  private errorSignal = signal<string | null>(null);
  public error = computed(() => this.errorSignal());

  authors = computed(() => this.authorsSignal());

  getAuthorById(id: number) {
    return computed(() =>
      this.authorsSignal().find((author) => author.id === id)
    );
  }

  getAllAuthors() {
    this.http
      .get<{ data: Author[] }>('http://localhost:8080/authors')
      .subscribe({
        next: (response) => {
          this.authorsSignal.set(response.data);
        },
        error: (error) => {
          console.error('Error fetching authors:', error);
          this.errorSignal.set(
            error.error?.errors?.[0]?.msg || 'Failed to fetch authors'
          );
          this.authorsSignal.set([]);
        },
      });
  }

  addAuthor(author: Author) {
    const authorToCreate = {
      ...author,
      id: undefined, // Remove any client-side ID to let server assign it
    };
    console.log('authorToCreate', authorToCreate);
    return this.http
      .post<{ data: Author }>(
        'http://localhost:8080/authors/create',
        authorToCreate
      )
      .pipe(
        tap({
          next: (response) => {
            this.authorsSignal.update((authors) => [...authors, response.data]);
            this.errorSignal.set(null);
          },
          error: (error) => {
            console.error('Error adding author:', error);
            this.errorSignal.set(error.error.errors[0].msg);
          },
        })
      );
  }

  updateAuthor(updatedAuthor: Author) {
    this.authorsSignal.update((authors) =>
      authors.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      )
    );
  }

  deleteAuthor(id: number) {
    this.authorsSignal.update((authors) =>
      authors.filter((author) => author.id !== id)
    );
  }

  clearError() {
    this.errorSignal.set(null);
  }
}
