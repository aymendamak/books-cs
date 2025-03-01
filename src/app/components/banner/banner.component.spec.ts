import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let spectator: SpectatorHost<BannerComponent>;
  const createHost = createHostFactory(BannerComponent);

  beforeEach(() => {
    spectator = createHost(`<app-banner></app-banner>`);
  });

  it('should display the correct title', () => {
    const titleElement = spectator.query('#banner-title');
    expect(titleElement?.textContent).toBe(' Welcome to our Book Library ');
  });

  it('should display the correct subtitle', () => {
    const subtitleElement = spectator.query('#banner-subtitle');
    expect(subtitleElement?.textContent).toBe(
      ' Discover your next great read '
    );
  });
});
