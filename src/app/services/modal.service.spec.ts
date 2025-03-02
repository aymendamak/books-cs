import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ModalService } from './modal.service';
import { AuthorService } from './author.service';
import { BookService } from './book.service';
import { of, throwError } from 'rxjs';

describe('ModalService', () => {
  let spectator: SpectatorService<ModalService>;
  const createService = createServiceFactory({
    service: ModalService,
    providers: [
      {
        provide: AuthorService,
        useValue: {
          addAuthor: () => of({}),
        },
      },
      {
        provide: BookService,
        useValue: {
          addBook: () => of({}),
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

  it('should create a new author', () => {
    const authorService = spectator.inject(AuthorService);
    const addAuthorSpy = jest.spyOn(authorService, 'addAuthor');
    spectator.service.createNewAuthor({} as any);

    expect(addAuthorSpy).toHaveBeenCalled();
    expect(spectator.service.isOpen()).toBeFalsy();
    expect(spectator.service.modalType()).toBeNull();
    expect(spectator.service.modalAction()).toBeNull();
  });

  it('should handle error when create a new author', () => {
    const authorService = spectator.inject(AuthorService);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const addAuthorSpy = jest
      .spyOn(authorService, 'addAuthor')
      .mockReturnValue(throwError(() => new Error('Test error')));
    spectator.service.createNewAuthor({} as any);

    expect(addAuthorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should create a new book', () => {
    const bookService = spectator.inject(BookService);
    const addBookSpy = jest.spyOn(bookService, 'addBook');
    spectator.service.createNewBook({} as any);
    expect(addBookSpy).toHaveBeenCalled();
    expect(spectator.service.isOpen()).toBeFalsy();
    expect(spectator.service.modalType()).toBeNull();
    expect(spectator.service.modalAction()).toBeNull();
  });

  it('should handle error when create a new book', () => {
    const bookService = spectator.inject(BookService);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const addBookSpy = jest
      .spyOn(bookService, 'addBook')
      .mockReturnValue(throwError(() => new Error('Test error')));
    spectator.service.createNewBook({} as any);

    expect(addBookSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should open book details modal', () => {
    const book = {} as any;
    spectator.service.openBookDetailsModal(book);
    expect(spectator.service.currentBook()).toBe(book);
    expect(spectator.service.modalType()).toBe('details');
    expect(spectator.service.isOpen()).toBeTruthy();
  });

  it('should open author details modal', () => {
    const author = {} as any;
    spectator.service.openAuthorDetailsModal(author);
    expect(spectator.service.currentAuthor()).toBe(author);
    expect(spectator.service.modalType()).toBe('details');
    expect(spectator.service.isOpen()).toBeTruthy();
  });

  it('should open create modal for Author', () => {
    spectator.service.openCreateModal('author');
    expect(spectator.service.modalType()).toBe('create');
    expect(spectator.service.modalAction()).toBe('author');
    expect(spectator.service.isOpen()).toBeTruthy();
  });

  it('should open create modal for Book', () => {
    spectator.service.openCreateModal('book');
    expect(spectator.service.modalType()).toBe('create');
    expect(spectator.service.modalAction()).toBe('book');
    expect(spectator.service.isOpen()).toBeTruthy();
  });

  it('should close modal', () => {
    spectator.service.closeModal();
    expect(spectator.service.isOpen()).toBeFalsy();
    expect(spectator.service.modalType()).toBeNull();
    expect(spectator.service.currentBook()).toBeNull();
  });
});
