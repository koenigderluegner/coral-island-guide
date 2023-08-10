import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistEntrySeaCritterComponent } from './checklist-entry-sea-critter.component';

describe('ChecklistEntrySeaCritterComponent', () => {
    let component: ChecklistEntrySeaCritterComponent;
    let fixture: ComponentFixture<ChecklistEntrySeaCritterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChecklistEntrySeaCritterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChecklistEntrySeaCritterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
