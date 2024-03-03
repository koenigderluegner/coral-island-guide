import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeritPointsComponent } from './merit-points.component';

describe('MeritPointsComponent', () => {
    let component: MeritPointsComponent;
    let fixture: ComponentFixture<MeritPointsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MeritPointsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MeritPointsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
