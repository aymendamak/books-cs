import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { BookService } from './book.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Book } from '../models/book.model';

describe('BookService', () => {
  let spectator: SpectatorService<BookService>;
  const createService = createServiceFactory({
    service: BookService,
    providers: [
      {
        provide: HttpClient,
        useValue: {
          get: () => of({ data: [] }),
          post: () => of({ data: {} }),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should get all books', () => {
    const http = spectator.inject(HttpClient);
    const getSpy = jest.spyOn(http, 'get').mockReturnValue(
      of({
        data: [
          {
            id: 1,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            description: 'A classic of modern American literature.',
          },
        ],
      })
    );
    spectator.service.getAllBooks();
    expect(getSpy).toHaveBeenCalled();
    expect(spectator.service.books()).toEqual([
      {
        id: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A classic of modern American literature.',
      },
    ]);
  });

  it('Should handle error when fetching books', () => {
    const http = spectator.inject(HttpClient);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const getSpy = jest
      .spyOn(http, 'get')
      .mockReturnValue(throwError(() => new Error('Test error')));
    spectator.service.getAllBooks();
    expect(getSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(spectator.service.books()).toEqual([]);
  });

  it('should get book by ID', () => {
    const books = [
      {
        id: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A classic of modern American literature.',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A classic of modern American literature.',
      },
    ];
    const http = spectator.inject(HttpClient);
    jest.spyOn(http, 'get').mockReturnValue(of({ data: books }));
    spectator.service.getAllBooks();
    const book = spectator.service.getBookById(1);
    expect(book()).toEqual(books[0]);
  });

  it('should create a new book', () => {
    const mockedBook: Book = {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: {
        name: 'Harper Lee',
        biography: 'A classic of modern American literature.',
      },
      description: 'A classic of modern American literature.',
    };
    const http = spectator.inject(HttpClient);
    const postSpy = jest
      .spyOn(http, 'post')
      .mockReturnValue(of({ data: mockedBook }));

    spectator.service.addBook(mockedBook).subscribe();

    expect(postSpy).toHaveBeenCalledWith(
      'http://localhost:8080/books/create',
      mockedBook
    );
    expect(spectator.service.books()).toEqual([mockedBook]);
  });
});
