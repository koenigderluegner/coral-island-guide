import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistEntryInsectComponent } from './checklist-entry-insect.component';

describe('ChecklistEntryInsectComponent', () => {
    let component: ChecklistEntryInsectComponent;
    let fixture: ComponentFixture<ChecklistEntryInsectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChecklistEntryInsectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChecklistEntryInsectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
