import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MuseumChecklistComponent } from './museum-checklist.component';

describe('MuseumChecklistComponent', () => {
    let component: MuseumChecklistComponent;
    let fixture: ComponentFixture<MuseumChecklistComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MuseumChecklistComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MuseumChecklistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
