import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityGridComponent } from './quality-grid.component';

describe('QualityGridComponent', () => {
  let component: QualityGridComponent;
  let fixture: ComponentFixture<QualityGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualityGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QualityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
