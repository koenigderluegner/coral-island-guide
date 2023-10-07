import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoPartialComponent } from './to-do-partial.component';

describe('ToDoPartialComponent', () => {
    let component: ToDoPartialComponent;
    let fixture: ComponentFixture<ToDoPartialComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToDoPartialComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoPartialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
