import { TestBed } from '@angular/core/testing';

import { BaseDbService } from './base-db.service';

describe('BaseDbService', () => {
  let service: BaseDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
