import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseSeaCrittersComponent } from './database-sea-critters.component';

describe('DatabaseSeaCrittersComponent', () => {
    let component: DatabaseSeaCrittersComponent;
    let fixture: ComponentFixture<DatabaseSeaCrittersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseSeaCrittersComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseSeaCrittersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
