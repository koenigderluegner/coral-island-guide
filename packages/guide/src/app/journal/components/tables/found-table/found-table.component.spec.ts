import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundTableComponent } from './found-table.component';

describe('FoundTableComponent', () => {
  let component: FoundTableComponent;
  let fixture: ComponentFixture<FoundTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
