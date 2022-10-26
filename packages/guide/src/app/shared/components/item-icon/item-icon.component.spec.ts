import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemIconComponent } from './item-icon.component';

describe('ItemIconComponent', () => {
  let component: ItemIconComponent;
  let fixture: ComponentFixture<ItemIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
