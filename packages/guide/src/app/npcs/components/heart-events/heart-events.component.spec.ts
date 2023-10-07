import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeartEventsComponent } from './heart-events.component';

describe('HeartEventsComponent', () => {
    let component: HeartEventsComponent;
    let fixture: ComponentFixture<HeartEventsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeartEventsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeartEventsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
