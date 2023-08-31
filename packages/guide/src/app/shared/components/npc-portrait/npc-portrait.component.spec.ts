import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NpcPortraitComponent } from './npc-portrait.component';

describe('NpcPortraitComponent', () => {
    let component: NpcPortraitComponent;
    let fixture: ComponentFixture<NpcPortraitComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NpcPortraitComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NpcPortraitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
