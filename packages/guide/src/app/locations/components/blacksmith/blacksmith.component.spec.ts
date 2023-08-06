import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlacksmithComponent } from './blacksmith.component';

describe('BlacksmithComponent', () => {
    let component: BlacksmithComponent;
    let fixture: ComponentFixture<BlacksmithComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BlacksmithComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BlacksmithComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
