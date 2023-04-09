import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerToolbarComponent } from './planner-toolbar.component';

describe('PlannerToolbarComponent', () => {
    let component: PlannerToolbarComponent;
    let fixture: ComponentFixture<PlannerToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlannerToolbarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PlannerToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
