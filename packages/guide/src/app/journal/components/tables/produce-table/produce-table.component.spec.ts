import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceTableComponent } from './produce-table.component';

describe('ProduceTableComponent', () => {
  let component: ProduceTableComponent;
  let fixture: ComponentFixture<ProduceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduceTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
