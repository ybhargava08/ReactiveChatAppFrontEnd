import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFunctionMsgSendAreaComponent } from './chat-function-msg-send-area.component';

describe('ChatFunctionMsgSendAreaComponent', () => {
  let component: ChatFunctionMsgSendAreaComponent;
  let fixture: ComponentFixture<ChatFunctionMsgSendAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFunctionMsgSendAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFunctionMsgSendAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
