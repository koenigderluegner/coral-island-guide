import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TornPageDetailsComponent } from './torn-page-details.component';

describe('TornPageDetailsComponent', () => {
    let component: TornPageDetailsComponent;
    let fixture: ComponentFixture<TornPageDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TornPageDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TornPageDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
