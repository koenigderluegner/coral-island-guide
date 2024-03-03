import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FestivalShopItemTableComponent } from './festival-shop-item-table.component';

describe('FestivalShopItemTableComponent', () => {
    let component: FestivalShopItemTableComponent;
    let fixture: ComponentFixture<FestivalShopItemTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FestivalShopItemTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FestivalShopItemTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
