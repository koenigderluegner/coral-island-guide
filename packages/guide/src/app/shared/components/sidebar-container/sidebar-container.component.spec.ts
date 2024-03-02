import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContainerComponent } from './sidebar-container.component';

describe('SidebarContainerComponent', () => {
    let component: SidebarContainerComponent;
    let fixture: ComponentFixture<SidebarContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarContainerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SidebarContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
