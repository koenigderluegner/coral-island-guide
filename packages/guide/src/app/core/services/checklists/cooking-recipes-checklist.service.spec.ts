import { TestBed } from '@angular/core/testing';

import { CookingRecipesChecklistService } from './cooking-recipes-checklist.service';

describe('CookingRecipesChecklistService', () => {
    let service: CookingRecipesChecklistService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CookingRecipesChecklistService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
