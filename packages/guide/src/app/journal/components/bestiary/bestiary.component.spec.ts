import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestiaryComponent } from './bestiary.component';

describe('BestiaryComponent', () => {
    let component: BestiaryComponent;
    let fixture: ComponentFixture<BestiaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BestiaryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BestiaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
