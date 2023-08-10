import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistPartialComponent } from './checklist-partial.component';

describe('ChecklistPartialComponent', () => {
    let component: ChecklistPartialComponent;
    let fixture: ComponentFixture<ChecklistPartialComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChecklistPartialComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChecklistPartialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
