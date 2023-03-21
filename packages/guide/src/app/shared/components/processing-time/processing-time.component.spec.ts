import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingTimeComponent } from './processing-time.component';

describe('ProcessingTimeComponent', () => {
    let component: ProcessingTimeComponent;
    let fixture: ComponentFixture<ProcessingTimeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessingTimeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProcessingTimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
