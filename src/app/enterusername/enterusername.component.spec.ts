import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterusernameComponent } from './enterusername.component';

describe('EnterusernameComponent', () => {
  let component: EnterusernameComponent;
  let fixture: ComponentFixture<EnterusernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterusernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterusernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
