import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeachShackComponent } from './beach-shack.component';

describe('BeachShackComponent', () => {
    let component: BeachShackComponent;
    let fixture: ComponentFixture<BeachShackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BeachShackComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BeachShackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
