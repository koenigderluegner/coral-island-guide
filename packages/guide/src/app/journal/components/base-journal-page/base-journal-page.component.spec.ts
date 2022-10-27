import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseJournalPageComponent } from './base-journal-page.component';

describe('BaseJournalPageComponent', () => {
  let component: BaseJournalPageComponent;
  let fixture: ComponentFixture<BaseJournalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseJournalPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseJournalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
