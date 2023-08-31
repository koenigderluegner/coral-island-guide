import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NpcListComponent } from './npc-list.component';

describe('NpcListComponent', () => {
    let component: NpcListComponent;
    let fixture: ComponentFixture<NpcListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NpcListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NpcListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
