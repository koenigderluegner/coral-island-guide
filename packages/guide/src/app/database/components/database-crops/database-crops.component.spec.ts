import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCropsComponent } from './database-crops.component';

describe('DatabaseCropsComponent', () => {
    let component: DatabaseCropsComponent;
    let fixture: ComponentFixture<DatabaseCropsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseCropsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseCropsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
