import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoralGuideComponent } from './my-coral-guide.component';

describe('MyCoralGuideComponent', () => {
    let component: MyCoralGuideComponent;
    let fixture: ComponentFixture<MyCoralGuideComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MyCoralGuideComponent]
        });
        fixture = TestBed.createComponent(MyCoralGuideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
