import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketAndPanComponent } from './socket-and-pan.component';

describe('SocketAndPanComponent', () => {
    let component: SocketAndPanComponent;
    let fixture: ComponentFixture<SocketAndPanComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SocketAndPanComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SocketAndPanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
