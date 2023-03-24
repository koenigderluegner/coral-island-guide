import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCookingComponent } from './database-cooking.component';

describe('DatabaseCookingComponent', () => {
    let component: DatabaseCookingComponent;
    let fixture: ComponentFixture<DatabaseCookingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseCookingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseCookingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
