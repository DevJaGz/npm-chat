import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBrandComponent } from './chat-brand.component';

describe('ChatBrandComponent', () => {
  let component: ChatBrandComponent;
  let fixture: ComponentFixture<ChatBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
