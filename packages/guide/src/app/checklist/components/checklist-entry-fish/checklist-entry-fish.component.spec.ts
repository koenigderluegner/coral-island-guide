import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistEntryFishComponent } from './checklist-entry-fish.component';

describe('ChecklistEntryFishComponent', () => {
    let component: ChecklistEntryFishComponent;
    let fixture: ComponentFixture<ChecklistEntryFishComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChecklistEntryFishComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChecklistEntryFishComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
