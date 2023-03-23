import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseAnimalProductsComponent } from './database-animal-products.component';

describe('DatabaseAnimalProductsComponent', () => {
    let component: DatabaseAnimalProductsComponent;
    let fixture: ComponentFixture<DatabaseAnimalProductsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseAnimalProductsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseAnimalProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
