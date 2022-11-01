import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaughtTableComponent } from './caught-table.component';

describe('FishTableComponent', () => {
  let component: CaughtTableComponent;
  let fixture: ComponentFixture<CaughtTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaughtTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaughtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
