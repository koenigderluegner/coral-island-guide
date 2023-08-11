import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseShopItemProcessComponent } from './database-shop-item-process.component';

describe('DatabaseShopItemProcessComponent', () => {
    let component: DatabaseShopItemProcessComponent;
    let fixture: ComponentFixture<DatabaseShopItemProcessComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseShopItemProcessComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseShopItemProcessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
