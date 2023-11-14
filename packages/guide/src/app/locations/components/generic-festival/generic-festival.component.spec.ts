import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericFestivalComponent } from './generic-festival.component';

describe('GenericFestivalComponent', () => {
    let component: GenericFestivalComponent;
    let fixture: ComponentFixture<GenericFestivalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GenericFestivalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GenericFestivalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
