import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCraftingComponent } from './database-crafting.component';

describe('DatabaseCraftingComponent', () => {
    let component: DatabaseCraftingComponent;
    let fixture: ComponentFixture<DatabaseCraftingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseCraftingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseCraftingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
