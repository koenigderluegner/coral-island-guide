import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChancePerItemListComponent } from './chance-per-item-list.component';

describe('ChancePerItemListComponent', () => {
    let component: ChancePerItemListComponent;
    let fixture: ComponentFixture<ChancePerItemListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChancePerItemListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChancePerItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
