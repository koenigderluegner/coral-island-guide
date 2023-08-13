import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemUpgradeTableComponent } from './item-upgrade-table.component';

describe('ItemUpgradeTableComponent', () => {
    let component: ItemUpgradeTableComponent;
    let fixture: ComponentFixture<ItemUpgradeTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemUpgradeTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ItemUpgradeTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
