import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailContainerComponent } from './list-detail-container.component';

describe('ListDetailContainerComponent', () => {
  let component: ListDetailContainerComponent;
  let fixture: ComponentFixture<ListDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDetailContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
