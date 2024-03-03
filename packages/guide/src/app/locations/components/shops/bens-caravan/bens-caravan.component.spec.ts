import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BensCaravanComponent } from './bens-caravan.component';

describe('BensCaravanComponent', () => {
    let component: BensCaravanComponent;
    let fixture: ComponentFixture<BensCaravanComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BensCaravanComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BensCaravanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
