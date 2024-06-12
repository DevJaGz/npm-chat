import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpmChatComponent } from './npm-chat.component';

describe('NpmChatComponent', () => {
  let component: NpmChatComponent;
  let fixture: ComponentFixture<NpmChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpmChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpmChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
