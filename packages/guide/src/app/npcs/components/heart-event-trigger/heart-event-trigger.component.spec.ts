import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeartEventTriggerComponent } from './heart-event-trigger.component';

describe('HeartEventTriggerComponent', () => {
    let component: HeartEventTriggerComponent;
    let fixture: ComponentFixture<HeartEventTriggerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeartEventTriggerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeartEventTriggerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
