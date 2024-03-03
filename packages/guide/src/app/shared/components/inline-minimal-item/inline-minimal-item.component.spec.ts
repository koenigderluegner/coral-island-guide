import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineMinimalItemComponent } from './inline-minimal-item.component';

describe('InlineMinimalItemComponent', () => {
    let component: InlineMinimalItemComponent;
    let fixture: ComponentFixture<InlineMinimalItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InlineMinimalItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InlineMinimalItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
