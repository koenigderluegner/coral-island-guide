import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RarityIconComponent } from './rarity-icon.component';

describe('RarityIconComponent', () => {
    let component: RarityIconComponent;
    let fixture: ComponentFixture<RarityIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RarityIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RarityIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
