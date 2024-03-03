import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoEntryFishComponent } from './to-do-entry-fish.component';

describe('ToDoEntryFishComponent', () => {
    let component: ToDoEntryFishComponent;
    let fixture: ComponentFixture<ToDoEntryFishComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToDoEntryFishComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoEntryFishComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
