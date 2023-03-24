import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorTableComponent } from './processor-table.component';

describe('ProcessorTableComponent', () => {
    let component: ProcessorTableComponent;
    let fixture: ComponentFixture<ProcessorTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessorTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProcessorTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
