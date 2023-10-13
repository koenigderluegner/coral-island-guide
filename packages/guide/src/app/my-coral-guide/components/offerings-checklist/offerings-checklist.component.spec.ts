import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfferingsChecklistComponent } from './offerings-checklist.component';

describe('OfferingsChecklistComponent', () => {
    let component: OfferingsChecklistComponent;
    let fixture: ComponentFixture<OfferingsChecklistComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OfferingsChecklistComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OfferingsChecklistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
