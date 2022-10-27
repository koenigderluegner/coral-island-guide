import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundDetailsComponent } from './found-details.component';

describe('FoundDetailsComponent', () => {
  let component: FoundDetailsComponent;
  let fixture: ComponentFixture<FoundDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoundDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
