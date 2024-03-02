import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaughtDetailsComponent } from './caught-details.component';

describe('CaughtDetailsComponent', () => {
    let component: CaughtDetailsComponent;
    let fixture: ComponentFixture<CaughtDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CaughtDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CaughtDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
