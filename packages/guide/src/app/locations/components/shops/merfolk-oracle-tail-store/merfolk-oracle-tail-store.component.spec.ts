import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerfolkOracleTailStoreComponent } from './merfolk-oracle-tail-store.component';

describe('MerfolkOracleTailStoreComponent', () => {
    let component: MerfolkOracleTailStoreComponent;
    let fixture: ComponentFixture<MerfolkOracleTailStoreComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MerfolkOracleTailStoreComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MerfolkOracleTailStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
