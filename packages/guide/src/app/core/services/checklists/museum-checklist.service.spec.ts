import { TestBed } from '@angular/core/testing';

import { MuseumChecklistService } from './museum-checklist.service';

describe('MuseumChecklistService', () => {
    let service: MuseumChecklistService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MuseumChecklistService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
