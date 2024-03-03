import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FestivalShopItemDetailsComponent } from './festival-shop-item-details.component';

describe('FestivalShopItemDetailsComponent', () => {
    let component: FestivalShopItemDetailsComponent;
    let fixture: ComponentFixture<FestivalShopItemDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FestivalShopItemDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FestivalShopItemDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
