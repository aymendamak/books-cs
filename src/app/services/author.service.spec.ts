import { HttpClient } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AuthorService } from './author.service';
import { of, throwError } from 'rxjs';

describe('AuthorService', () => {
  let spectator: SpectatorService<AuthorService>;
  const createService = createServiceFactory({
    service: AuthorService,
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

  it('should get all authors', () => {
    const mockedAuthors = [
      {
        id: 1,
        name: 'Harper Lee',
        birthYear: 1926,
        deathYear: 2016,
      },
    ];
    const http = spectator.inject(HttpClient);
    const getSpy = jest
      .spyOn(http, 'get')
      .mockReturnValue(of({ data: mockedAuthors }));
    spectator.service.getAllAuthors();
    expect(getSpy).toHaveBeenCalled();
    expect(spectator.service.authors()).toEqual(mockedAuthors);
  });

  it('Should handle error when fetching authors', () => {
    const http = spectator.inject(HttpClient);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const getSpy = jest
      .spyOn(http, 'get')
      .mockReturnValue(throwError(() => new Error('Failed to fetch authors')));
    spectator.service.getAllAuthors();
    expect(getSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(spectator.service.error()).toEqual('Failed to fetch authors');
    expect(spectator.service.authors()).toEqual([]);
  });

  it('should create an author', () => {
    const mockedAuthor = {
      id: 1,
      name: 'Harper Lee',
      biography: 'A classic of modern American literature.',
    };
    const http = spectator.inject(HttpClient);
    const postSpy = jest
      .spyOn(http, 'post')
      .mockReturnValue(of({ data: mockedAuthor }));
    spectator.service.addAuthor(mockedAuthor).subscribe();
    expect(postSpy).toHaveBeenCalled();
    expect(spectator.service.authors()).toEqual([mockedAuthor]);
  });

  it('should handle error when adding an author', () => {
    const mockedAuthor = {
      id: 1,
      name: 'Harper Lee',
      biography: 'A classic of modern American literature.',
    };
    const http = spectator.inject(HttpClient);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const postSpy = jest.spyOn(http, 'post').mockReturnValue(
      throwError(() => ({
        error: {
          errors: [{ msg: 'Failed to add author' }],
        },
      }))
    );
    spectator.service.addAuthor(mockedAuthor).subscribe();
    expect(postSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(spectator.service.error()).toEqual('Failed to add author');
  });
});
