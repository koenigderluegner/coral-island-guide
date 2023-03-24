import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseInsectsComponent } from './database-insects.component';

describe('DatabaseInsectsComponent', () => {
    let component: DatabaseInsectsComponent;
    let fixture: ComponentFixture<DatabaseInsectsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseInsectsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseInsectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
