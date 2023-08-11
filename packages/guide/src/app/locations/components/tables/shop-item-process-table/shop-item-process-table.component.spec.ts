import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopItemProcessTableComponent } from './shop-item-process-table.component';

describe('ShopItemProcessTableComponent', () => {
    let component: ShopItemProcessTableComponent;
    let fixture: ComponentFixture<ShopItemProcessTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopItemProcessTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ShopItemProcessTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
