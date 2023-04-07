import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingsTableComponent } from './offerings-table.component';

describe('OfferingsTableComponent', () => {
    let component: OfferingsTableComponent;
    let fixture: ComponentFixture<OfferingsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OfferingsTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OfferingsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
