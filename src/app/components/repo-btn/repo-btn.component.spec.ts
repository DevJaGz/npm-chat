import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoBtnComponent } from './repo-btn.component';

describe('RepoBtnComponent', () => {
  let component: RepoBtnComponent;
  let fixture: ComponentFixture<RepoBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
