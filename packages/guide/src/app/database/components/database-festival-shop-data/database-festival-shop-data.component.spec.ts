import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseFestivalShopDataComponent } from './database-festival-shop-data.component';

describe('DatabaseFestivalShopDataComponent', () => {
    let component: DatabaseFestivalShopDataComponent;
    let fixture: ComponentFixture<DatabaseFestivalShopDataComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseFestivalShopDataComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseFestivalShopDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
