import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundComponent } from './found.component';

describe('FoundComponent', () => {
  let component: FoundComponent;
  let fixture: ComponentFixture<FoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
