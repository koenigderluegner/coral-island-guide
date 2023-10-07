import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoEntryBaseComponent } from './to-do-entry-base.component';

describe('ToDoEntryBaseComponent', () => {
    let component: ToDoEntryBaseComponent;
    let fixture: ComponentFixture<ToDoEntryBaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToDoEntryBaseComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoEntryBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
