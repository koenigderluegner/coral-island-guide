import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTabbedSelectableContainerComponent } from './base-tabbed-selectable-container.component';

describe('BaseTabbedSelectableContainerComponent', () => {
    let component: BaseTabbedSelectableContainerComponent<any>;
    let fixture: ComponentFixture<BaseTabbedSelectableContainerComponent<any>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BaseTabbedSelectableContainerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BaseTabbedSelectableContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
