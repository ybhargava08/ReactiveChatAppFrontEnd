import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFunctionMsgshowareaComponent } from './chat-function-msgshowarea.component';

describe('ChatFunctionMsgshowareaComponent', () => {
  let component: ChatFunctionMsgshowareaComponent;
  let fixture: ComponentFixture<ChatFunctionMsgshowareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFunctionMsgshowareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFunctionMsgshowareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
