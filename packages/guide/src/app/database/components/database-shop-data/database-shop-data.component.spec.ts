import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseShopDataComponent } from './database-shop-data.component';

describe('DatabaseShopDataComponent', () => {
    let component: DatabaseShopDataComponent;
    let fixture: ComponentFixture<DatabaseShopDataComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseShopDataComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseShopDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
