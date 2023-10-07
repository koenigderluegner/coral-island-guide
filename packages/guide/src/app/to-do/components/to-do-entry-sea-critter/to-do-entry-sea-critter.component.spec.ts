import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoEntrySeaCritterComponent } from './to-do-entry-sea-critter.component';

describe('ToDoEntrySeaCritterComponent', () => {
    let component: ToDoEntrySeaCritterComponent;
    let fixture: ComponentFixture<ToDoEntrySeaCritterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToDoEntrySeaCritterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoEntrySeaCritterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
