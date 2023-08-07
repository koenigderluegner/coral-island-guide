import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlyInBetaComponent } from './only-in-beta.component';

describe('OnlyInBetaComponent', () => {
    let component: OnlyInBetaComponent;
    let fixture: ComponentFixture<OnlyInBetaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OnlyInBetaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OnlyInBetaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
