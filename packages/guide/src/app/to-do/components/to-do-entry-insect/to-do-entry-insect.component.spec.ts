import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoEntryInsectComponent } from './to-do-entry-insect.component';

describe('ToDoEntryInsectComponent', () => {
    let component: ToDoEntryInsectComponent;
    let fixture: ComponentFixture<ToDoEntryInsectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToDoEntryInsectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoEntryInsectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
