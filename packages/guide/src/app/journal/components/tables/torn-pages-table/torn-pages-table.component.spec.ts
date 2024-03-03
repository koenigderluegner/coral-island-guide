import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TornPagesTableComponent } from './torn-pages-table.component';

describe('TornPagesTableComponent', () => {
    let component: TornPagesTableComponent;
    let fixture: ComponentFixture<TornPagesTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TornPagesTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TornPagesTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
