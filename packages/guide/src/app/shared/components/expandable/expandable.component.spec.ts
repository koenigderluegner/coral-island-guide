import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpandableComponent } from './expandable.component';

describe('ExpandableComponent', () => {
    let component: ExpandableComponent;
    let fixture: ComponentFixture<ExpandableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpandableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExpandableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
