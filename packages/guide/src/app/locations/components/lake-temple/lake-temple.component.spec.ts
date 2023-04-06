import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LakeTempleComponent } from './lake-temple.component';

describe('LakeTempleComponent', () => {
    let component: LakeTempleComponent;
    let fixture: ComponentFixture<LakeTempleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LakeTempleComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LakeTempleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
