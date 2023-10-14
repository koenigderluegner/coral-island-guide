import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MailDetailsComponent } from './mail-details.component';

describe('MailDetailsComponent', () => {
    let component: MailDetailsComponent;
    let fixture: ComponentFixture<MailDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MailDetailsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MailDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
