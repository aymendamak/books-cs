import {
  createHostFactory,
  mockProvider,
  SpectatorHost,
} from '@ngneat/spectator';
import { AuthorListComponent } from './author-list.component';
import { AuthorItemComponent } from '../author-item/author-item.component';
import { AuthorService } from '../../services/author.service';
import { of } from 'rxjs';

describe('AuthorListComponent', () => {
  let spectator: SpectatorHost<AuthorListComponent>;
  const createHost = createHostFactory({
    component: AuthorListComponent,
    imports: [AuthorItemComponent],
    providers: [
      mockProvider(AuthorService, {
        getAllAuthors: () =>
          of([
            { name: 'John Doe', biography: 'this is me' },
            { name: 'Jane Doe', biography: 'this is me too' },
          ]),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createHost(`<app-author-list></app-author-list>`);
  });

  it('Should Create', () => {
    expect(spectator.component).toBeTruthy();
  });

  //   it('should display the correct number of authors', () => {
  //     expect(spectator.queryAll('.author-item').length).toBe(2);
  //   });
});
