import { TestBed } from '@angular/core/testing';

import { OfferingChecklistService } from './offering-checklist.service';

describe('OfferingChecklistService', () => {
    let service: OfferingChecklistService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OfferingChecklistService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
