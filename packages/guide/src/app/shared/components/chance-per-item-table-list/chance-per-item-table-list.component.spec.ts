import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChancePerItemTableListComponent } from './chance-per-item-table-list.component';

describe('ChancePerItemTableListComponent', () => {
    let component: ChancePerItemTableListComponent;
    let fixture: ComponentFixture<ChancePerItemTableListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChancePerItemTableListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChancePerItemTableListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
