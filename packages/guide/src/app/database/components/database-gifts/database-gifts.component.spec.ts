import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseGiftsComponent } from './database-gifts.component';

describe('DatabaseGiftsComponent', () => {
    let component: DatabaseGiftsComponent;
    let fixture: ComponentFixture<DatabaseGiftsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseGiftsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseGiftsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
