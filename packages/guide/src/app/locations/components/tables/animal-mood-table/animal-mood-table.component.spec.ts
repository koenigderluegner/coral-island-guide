import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalMoodTableComponent } from './animal-mood-table.component';

describe('AnimalMoodTableComponent', () => {
    let component: AnimalMoodTableComponent;
    let fixture: ComponentFixture<AnimalMoodTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AnimalMoodTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AnimalMoodTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
