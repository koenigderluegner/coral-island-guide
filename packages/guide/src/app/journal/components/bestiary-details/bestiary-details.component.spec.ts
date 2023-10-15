import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestiaryDetailsComponent } from './bestiary-details.component';

describe('BestiaryDetailsComponent', () => {
    let component: BestiaryDetailsComponent;
    let fixture: ComponentFixture<BestiaryDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BestiaryDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BestiaryDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
