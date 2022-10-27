import { TestBed } from '@angular/core/testing';

import { SaveGameService } from './save-game.service';

describe('SaveGameService', () => {
  let service: SaveGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
