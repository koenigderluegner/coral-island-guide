import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequirementsComponent } from './requirements.component';

describe('RequirementsComponent', () => {
    let component: RequirementsComponent;
    let fixture: ComponentFixture<RequirementsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RequirementsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RequirementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
