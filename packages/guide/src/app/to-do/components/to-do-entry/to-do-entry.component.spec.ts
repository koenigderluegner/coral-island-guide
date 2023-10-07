import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoEntryComponent } from './to-do-entry.component';

describe('ToDoEntryComponent', () => {
    let component: ToDoEntryComponent;
    let fixture: ComponentFixture<ToDoEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToDoEntryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
