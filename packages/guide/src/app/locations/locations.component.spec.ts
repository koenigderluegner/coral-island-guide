import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';

describe('LocationsComponent', () => {
    let component: LocationsComponent;
    let fixture: ComponentFixture<LocationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocationsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LocationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
