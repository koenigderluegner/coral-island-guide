import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseOfferingsComponent } from './database-offerings.component';

describe('DatabaseOfferingsComponent', () => {
    let component: DatabaseOfferingsComponent;
    let fixture: ComponentFixture<DatabaseOfferingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseOfferingsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseOfferingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
