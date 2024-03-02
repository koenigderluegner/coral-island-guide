import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSidebarItemComponent } from './module-sidebar-item.component';

describe('ModuleSidebarItemComponent', () => {
    let component: ModuleSidebarItemComponent;
    let fixture: ComponentFixture<ModuleSidebarItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModuleSidebarItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ModuleSidebarItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
