import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinementsListComponent } from './refinements-list.component';

describe('RefinementsListComponent', () => {
    let component: RefinementsListComponent;
    let fixture: ComponentFixture<RefinementsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RefinementsListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RefinementsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
