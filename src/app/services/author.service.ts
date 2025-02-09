import { Injectable, signal, computed } from '@angular/core';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private authorsSignal = signal<Author[]>([
    {
      id: 1,
      name: 'J.K. Rowling',
      biography: 'British author, best known for the Harry Potter series.',
      birthDate: new Date('1965-07-31'),
    },
    {
      id: 2,
      name: 'George R.R. Martin',
      biography:
        'American novelist and short story writer, author of A Song of Ice and Fire.',
      birthDate: new Date('1948-09-20'),
    },
    {
      id: 3,
      name: 'Stephen King',
      biography:
        'American author of horror, supernatural fiction, suspense, and fantasy novels.',
      birthDate: new Date('1947-09-21'),
    },
    {
      id: 4,
      name: 'Stephen Queen',
      biography: 'British author of Queens.',
      birthDate: new Date('1952-08-01'),
    },
  ]);

  authors = computed(() => this.authorsSignal());

  getAuthorById(id: number) {
    return computed(() =>
      this.authorsSignal().find((author) => author.id === id)
    );
  }

  addAuthor(author: Author) {
    this.authorsSignal.update((authors) => [
      ...authors,
      { ...author, id: authors.length + 1 },
    ]);
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
