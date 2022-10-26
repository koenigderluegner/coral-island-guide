import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseItemCardComponent } from './base-item-card.component';

describe('BaseItemCardComponent', () => {
  let component: BaseItemCardComponent;
  let fixture: ComponentFixture<BaseItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
