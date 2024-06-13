import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmProgressComponent } from './llm-progress.component';

describe('LlmProgressComponent', () => {
  let component: LlmProgressComponent;
  let fixture: ComponentFixture<LlmProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlmProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlmProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
