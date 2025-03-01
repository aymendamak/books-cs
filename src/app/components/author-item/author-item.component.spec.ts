import {
  createHostFactory,
  mockProvider,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator';
import { AuthorItemComponent } from './author-item.component';
import { ModalService } from '../../services/modal.service';

describe('AuthorItemComponent', () => {
  let spectator: SpectatorHost<AuthorItemComponent>;
  const createHost = createHostFactory({
    component: AuthorItemComponent,
    providers: [
      mockProvider(ModalService, {
        openAuthorDetailsModal: () => {},
      }),
    ],
  });

  beforeEach(() => {
    spectator = createHost(
      `<app-author-item [author]="author"></app-author-item>`
    );
  });

  it('should display the correct infos for user', () => {
    spectator = createHost(
      `<app-author-item [author]="author"></app-author-item>`,
      {
        hostProps: {
          author: {
            name: 'John Doe',
            biography: 'this is me',
          },
        },
      }
    );

    expect(spectator.query('.author-name')?.nodeValue).toBe('John Doe');
    expect(spectator.query('.author-biography')?.nodeValue).toBe('this is me');
  });
});
