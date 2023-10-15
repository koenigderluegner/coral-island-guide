import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseBestiaryComponent } from './database-bestiary.component';

describe('DatabaseBestiaryComponent', () => {
    let component: DatabaseBestiaryComponent;
    let fixture: ComponentFixture<DatabaseBestiaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseBestiaryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseBestiaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
