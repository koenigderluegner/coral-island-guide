import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestiaryTableComponent } from './bestiary-table.component';

describe('BestiaryTableComponent', () => {
    let component: BestiaryTableComponent;
    let fixture: ComponentFixture<BestiaryTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BestiaryTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BestiaryTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
