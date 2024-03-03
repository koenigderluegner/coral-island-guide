import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NPCsComponent } from './npcs.component';

describe('PeopleComponent', () => {
    let component: NPCsComponent;
    let fixture: ComponentFixture<NPCsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NPCsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NPCsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
