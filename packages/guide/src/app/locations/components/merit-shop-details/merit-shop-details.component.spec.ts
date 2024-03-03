import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeritShopDetailsComponent } from './merit-shop-details.component';

describe('MeritShopDetailsComponent', () => {
    let component: MeritShopDetailsComponent;
    let fixture: ComponentFixture<MeritShopDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MeritShopDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MeritShopDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
