import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSelectableContainerComponent } from './base-selectable-container.component';

describe('BaseSelectableContainerComponent', () => {
    let component: BaseSelectableContainerComponent<any>;
    let fixture: ComponentFixture<BaseSelectableContainerComponent<any>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BaseSelectableContainerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BaseSelectableContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
