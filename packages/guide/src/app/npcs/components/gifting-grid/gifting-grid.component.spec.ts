import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiftingGridComponent } from './gifting-grid.component';

describe('GiftingGridComponent', () => {
    let component: GiftingGridComponent;
    let fixture: ComponentFixture<GiftingGridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GiftingGridComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GiftingGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
