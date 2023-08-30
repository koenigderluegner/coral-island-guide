import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NpcHeadPortraitComponent } from './npc-head-portrait.component';

describe('NpcHeadPortraitComponent', () => {
    let component: NpcHeadPortraitComponent;
    let fixture: ComponentFixture<NpcHeadPortraitComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NpcHeadPortraitComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NpcHeadPortraitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
