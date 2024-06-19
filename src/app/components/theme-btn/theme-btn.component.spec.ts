import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBtnComponent } from './theme-btn.component';

describe('ThemeBtnComponent', () => {
  let component: ThemeBtnComponent;
  let fixture: ComponentFixture<ThemeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
