import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopItemProcessDataDetailsComponent } from './shop-item-process-data-details.component';

describe('ShopItemProcessDataDetailsComponent', () => {
    let component: ShopItemProcessDataDetailsComponent;
    let fixture: ComponentFixture<ShopItemProcessDataDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopItemProcessDataDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ShopItemProcessDataDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
