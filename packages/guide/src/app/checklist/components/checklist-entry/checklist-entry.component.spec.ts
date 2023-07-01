import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistEntryComponent } from './checklist-entry.component';

describe('ChecklistEntryComponent', () => {
    let component: ChecklistEntryComponent;
    let fixture: ComponentFixture<ChecklistEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChecklistEntryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChecklistEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
