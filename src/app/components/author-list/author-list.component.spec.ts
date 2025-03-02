import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { AuthorListComponent } from './author-list.component';
import { of } from 'rxjs';
import { AuthorService } from '../../services/author.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorListComponent', () => {
  let spectator: SpectatorHost<AuthorListComponent>;
  const createHost = createHostFactory({
    component: AuthorListComponent,
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: AuthorService,
        useValue: {
          getAllAuthors: () => of([]),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createHost(`<app-author-list></app-author-list>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
