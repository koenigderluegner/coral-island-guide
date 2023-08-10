import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistEntryBaseComponent } from './checklist-entry-base.component';

describe('ChecklistEntryBaseComponent', () => {
    let component: ChecklistEntryBaseComponent;
    let fixture: ComponentFixture<ChecklistEntryBaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChecklistEntryBaseComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChecklistEntryBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
