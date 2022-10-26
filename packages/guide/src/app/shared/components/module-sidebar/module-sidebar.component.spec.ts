import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSidebarComponent } from './module-sidebar.component';

describe('ModuleSidebarComponent', () => {
  let component: ModuleSidebarComponent;
  let fixture: ComponentFixture<ModuleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
