import { TestBed } from '@angular/core/testing';

import { BaseChecklistService } from './base-checklist.service';

describe('BaseChecklistService', () => {
    let service: BaseChecklistService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BaseChecklistService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
