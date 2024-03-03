import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseShopComponent } from './base-shop.component';

describe('BaseShopComponent', () => {
    let component: BaseShopComponent;
    let fixture: ComponentFixture<BaseShopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BaseShopComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BaseShopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
