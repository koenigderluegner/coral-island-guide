import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerfolkGeneralStoreComponent } from './merfolk-general-store.component';

describe('MerfolkGeneralStoreComponent', () => {
    let component: MerfolkGeneralStoreComponent;
    let fixture: ComponentFixture<MerfolkGeneralStoreComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MerfolkGeneralStoreComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MerfolkGeneralStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
