import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistEntryCatchableComponent } from './checklist-entry-catchable.component';

describe('ChecklistEntryCatchableComponent', () => {
    let component: ChecklistEntryCatchableComponent;
    let fixture: ComponentFixture<ChecklistEntryCatchableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChecklistEntryCatchableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChecklistEntryCatchableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
