import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseArtisanComponent } from './database-artisan.component';

describe('DatabaseArtisanComponent', () => {
    let component: DatabaseArtisanComponent;
    let fixture: ComponentFixture<DatabaseArtisanComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseArtisanComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseArtisanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
