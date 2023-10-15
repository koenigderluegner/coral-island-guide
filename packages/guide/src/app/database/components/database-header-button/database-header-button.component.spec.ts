import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatabaseHeaderButtonComponent } from './database-header-button.component';

describe('DatabaseHeaderButtonComponent', () => {
    let component: DatabaseHeaderButtonComponent;
    let fixture: ComponentFixture<DatabaseHeaderButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DatabaseHeaderButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DatabaseHeaderButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
