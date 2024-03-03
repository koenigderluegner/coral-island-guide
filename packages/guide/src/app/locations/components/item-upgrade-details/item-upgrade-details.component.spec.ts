import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemUpgradeDetailsComponent } from './item-upgrade-details.component';

describe('ItemUpgradeDetailsComponent', () => {
    let component: ItemUpgradeDetailsComponent;
    let fixture: ComponentFixture<ItemUpgradeDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ItemUpgradeDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ItemUpgradeDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
