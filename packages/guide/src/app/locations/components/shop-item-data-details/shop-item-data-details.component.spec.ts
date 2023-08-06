import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopItemDataDetailsComponent } from './shop-item-data-details.component';

describe('ShopItemDataDetailsComponent', () => {
    let component: ShopItemDataDetailsComponent;
    let fixture: ComponentFixture<ShopItemDataDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopItemDataDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ShopItemDataDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
