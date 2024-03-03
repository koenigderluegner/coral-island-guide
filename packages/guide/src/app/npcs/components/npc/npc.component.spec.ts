import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NpcComponent } from './npc.component';

describe('NpcComponent', () => {
    let component: NpcComponent;
    let fixture: ComponentFixture<NpcComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NpcComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NpcComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
