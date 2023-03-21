import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingTimePerQualityComponent } from './processing-time-per-quality.component';

describe('ProcessingTimePerQualityComponent', () => {
    let component: ProcessingTimePerQualityComponent;
    let fixture: ComponentFixture<ProcessingTimePerQualityComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessingTimePerQualityComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProcessingTimePerQualityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
