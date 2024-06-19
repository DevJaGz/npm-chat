import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChatBtnComponent } from './new-chat-btn.component';

describe('NewChatBtnComponent', () => {
  let component: NewChatBtnComponent;
  let fixture: ComponentFixture<NewChatBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewChatBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChatBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
