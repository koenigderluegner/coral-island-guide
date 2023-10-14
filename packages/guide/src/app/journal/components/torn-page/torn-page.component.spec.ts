import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TornPageComponent } from './torn-page.component';

describe('TornPageComponent', () => {
    let component: TornPageComponent;
    let fixture: ComponentFixture<TornPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TornPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TornPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
