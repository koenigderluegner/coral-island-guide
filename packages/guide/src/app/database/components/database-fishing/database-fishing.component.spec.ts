import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseFishingComponent } from './database-fishing.component';

describe('DatabaseFishingComponent', () => {
    let component: DatabaseFishingComponent;
    let fixture: ComponentFixture<DatabaseFishingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseFishingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseFishingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
