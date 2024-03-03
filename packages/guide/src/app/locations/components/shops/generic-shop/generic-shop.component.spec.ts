import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericShopComponent } from './generic-shop.component';

describe('GenericShopComponent', () => {
    let component: GenericShopComponent;
    let fixture: ComponentFixture<GenericShopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GenericShopComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GenericShopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
