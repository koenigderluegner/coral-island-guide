import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookingRecipesChecklistComponent } from './cooking-recipes-checklist.component';

describe('CookingRecipesChecklistComponent', () => {
    let component: CookingRecipesChecklistComponent;
    let fixture: ComponentFixture<CookingRecipesChecklistComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CookingRecipesChecklistComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CookingRecipesChecklistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
