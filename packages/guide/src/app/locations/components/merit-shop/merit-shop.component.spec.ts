import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeritShopComponent } from './merit-shop.component';

describe('MeritShopComponent', () => {
    let component: MeritShopComponent;
    let fixture: ComponentFixture<MeritShopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MeritShopComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MeritShopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
