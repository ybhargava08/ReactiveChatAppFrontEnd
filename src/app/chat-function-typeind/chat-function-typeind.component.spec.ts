import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFunctionTypeindComponent } from './chat-function-typeind.component';

describe('ChatFunctionTypeindComponent', () => {
  let component: ChatFunctionTypeindComponent;
  let fixture: ComponentFixture<ChatFunctionTypeindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFunctionTypeindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFunctionTypeindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
