import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcernedMonkeyComponent } from './concerned-monkey.component';

describe('ConcernedMonkeyComponent', () => {
    let component: ConcernedMonkeyComponent;
    let fixture: ComponentFixture<ConcernedMonkeyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConcernedMonkeyComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ConcernedMonkeyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
