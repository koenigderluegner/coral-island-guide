import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpeningHoursComponent } from './opening-hours.component';

describe('OpeningHoursComponent', () => {
    let component: OpeningHoursComponent;
    let fixture: ComponentFixture<OpeningHoursComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpeningHoursComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OpeningHoursComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
