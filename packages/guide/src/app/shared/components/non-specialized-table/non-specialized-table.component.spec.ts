import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSpecializedTableComponent } from './non-specialized-table.component';

describe('NonSpecializedTableComponent', () => {
    let component: NonSpecializedTableComponent;
    let fixture: ComponentFixture<NonSpecializedTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NonSpecializedTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NonSpecializedTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
