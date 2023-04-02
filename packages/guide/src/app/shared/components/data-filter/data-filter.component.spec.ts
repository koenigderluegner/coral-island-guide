import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFilterComponent } from './data-filter.component';

describe('DataFilterComponent', () => {
    let component: DataFilterComponent;
    let fixture: ComponentFixture<DataFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DataFilterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DataFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
