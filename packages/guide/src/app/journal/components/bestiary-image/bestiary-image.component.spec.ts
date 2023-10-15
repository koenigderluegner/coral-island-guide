import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestiaryImageComponent } from './bestiary-image.component';

describe('BestiaryImageComponent', () => {
    let component: BestiaryImageComponent;
    let fixture: ComponentFixture<BestiaryImageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BestiaryImageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BestiaryImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
