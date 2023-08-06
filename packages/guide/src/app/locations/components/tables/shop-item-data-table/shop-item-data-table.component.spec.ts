import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopItemDataTableComponent } from './shop-item-data-table.component';

describe('ShopItemDataTableComponent', () => {
    let component: ShopItemDataTableComponent;
    let fixture: ComponentFixture<ShopItemDataTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShopItemDataTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ShopItemDataTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
