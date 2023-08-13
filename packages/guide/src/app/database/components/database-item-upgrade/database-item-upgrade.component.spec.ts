import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseItemUpgradeComponent } from './database-item-upgrade.component';

describe('DatabaseItemUpgradeComponent', () => {
    let component: DatabaseItemUpgradeComponent;
    let fixture: ComponentFixture<DatabaseItemUpgradeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseItemUpgradeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseItemUpgradeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
