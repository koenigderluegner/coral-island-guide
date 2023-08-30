import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetAdoptionDetailsComponent } from './pet-adoption-details.component';

describe('PetAdoptionDetailsComponent', () => {
    let component: PetAdoptionDetailsComponent;
    let fixture: ComponentFixture<PetAdoptionDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PetAdoptionDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PetAdoptionDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
