import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFunctionUserCountComponent } from './chat-function-user-count.component';

describe('ChatFunctionUserCountComponent', () => {
  let component: ChatFunctionUserCountComponent;
  let fixture: ComponentFixture<ChatFunctionUserCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFunctionUserCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFunctionUserCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
