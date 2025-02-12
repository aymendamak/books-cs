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

  authors = computed(() => this.authorsSignal());

  getAuthorById(id: number) {
    return computed(() =>
      this.authorsSignal().find((author) => author.id === id)
    );
  }

  getAllAuthors() {
    this.http
      .get<{ data: Author[] }>('http://localhost:8080/authors')
      .subscribe((response) => {
        this.authorsSignal.set(response.data);
        console.log('authorsSignal', this.authorsSignal());
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
          },
          error: (error) => {
            console.error('Error adding author:', error);
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
}
