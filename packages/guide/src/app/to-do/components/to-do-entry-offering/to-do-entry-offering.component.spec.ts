import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoEntryOfferingComponent } from './to-do-entry-offering.component';

describe('ToDoEntryOfferingComponent', () => {
    let component: ToDoEntryOfferingComponent;
    let fixture: ComponentFixture<ToDoEntryOfferingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToDoEntryOfferingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoEntryOfferingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
