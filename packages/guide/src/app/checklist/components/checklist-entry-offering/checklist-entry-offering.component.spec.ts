import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistEntryOfferingComponent } from './checklist-entry-offering.component';

describe('ChecklistEntryOfferingComponent', () => {
    let component: ChecklistEntryOfferingComponent;
    let fixture: ComponentFixture<ChecklistEntryOfferingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChecklistEntryOfferingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChecklistEntryOfferingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
