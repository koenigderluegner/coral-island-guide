import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftingComponent } from './gifting.component';

describe('GiftingComponent', () => {
    let component: GiftingComponent;
    let fixture: ComponentFixture<GiftingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GiftingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GiftingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
