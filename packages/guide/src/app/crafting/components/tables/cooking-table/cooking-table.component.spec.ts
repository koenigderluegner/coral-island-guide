import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingTableComponent } from './cooking-table.component';

describe('CookingTableComponent', () => {
    let component: CookingTableComponent;
    let fixture: ComponentFixture<CookingTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CookingTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CookingTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
