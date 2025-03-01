import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let spectator: SpectatorHost<HeaderComponent>;
  const createHost = createHostFactory({
    component: HeaderComponent,
    imports: [RouterTestingModule],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({}),
          snapshot: {
            paramMap: {
              get: () => null,
            },
          },
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createHost(`<app-header></app-header>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const element = spectator.query('#title');
    expect(element?.textContent).toBe('BookLibrary');
  });

  it('should have a Home link', () => {
    const homeLink = spectator.query('a[routerLink="/"]');
    expect(homeLink?.textContent).toBe('BookLibrary');
  });

  it('should have a Books link', () => {
    const booksLink = spectator.query('a[routerLink="/books"]');
    expect(booksLink?.textContent).toBe(' Books ');
  });

  it('should have an Authors link', () => {
    const authorsLink = spectator.query('a[routerLink="/authors"]');
    expect(authorsLink?.textContent).toBe(' Authors ');
  });
});
